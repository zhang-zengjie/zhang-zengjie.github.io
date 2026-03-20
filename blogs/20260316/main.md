> Perception accuracy is often treated as a key indicator of safety in autonomous driving. However, if perception were perfect, would autonomous driving then be safe? Despite increasingly accurate detection and prediction, systems still fail in ways that are difficult to anticipate. There appears to be a persistent but hidden gap, one that is not yet captured by standard notions of accuracy. What exactly is missing? And more importantly, how can we make it visible?

Modern autonomous driving systems have made remarkable progress in perception. Benchmarks continue to report near-saturated performance on object detection, segmentation, and tracking. Yet, high-profile failures and long-tail incidents persist — not as outliers in noise, but as indicators of a deeper structural issue.

A fundamental question is then raised:

> If systems can already “see” the world with high accuracy, why do they still fail to behave safely within it?

At the heart of this question lies a subtle but critical distinction: the relationship between **perception** and **understanding**. The former concerns whether the system sees precisely, while the latter concerns whether it interprets the situation correctly.

In practice, a driving scenario is not merely a collection of objects, but a structured system of relationships — how relevant entities relate to each other, what constraints these relationships impose, and what behaviors they enable or prohibit.

A system may detect objects with high precision, yet still fail to interpret what those objects mean within this structure.
From a more formal perspective, this implies that **perception accuracy is not a sufficient condition for correct scene understanding.**

In simpler terms:

> *Seeing correctly does not necessarily imply understanding correctly*.

<div style="text-align: center;">
<img src="blogs/20260316/figure.png" alt="SOTIF" width="640">
</div>

Crucially, this gap is often invisible in standard evaluation pipelines. Aggregate metrics such as *mean Average Precision (mAP)* or *prediction accuracy* implicitly assume that correctness at the level of individual objects composes into correctness at the system level.

However, this assumption breaks down in complex, real-world interactions, especially near the boundaries of a system’s operational assumptions, and in multi-agent settings where behavior emerges not from isolated entities, but from their *coupled interactions*, *implicit coordination*, and *dynamically evolving dependencies*.

## The Elephant in the Room

A common implicit assumption in many system designs is that improving perception accuracy will eventually resolve higher-level interpretation challenges. A more precise way to describe this is:
*the dominant system paradigm assumes a clean separation between perception and decision-making, where semantic correctness at the perception layer is sufficient for downstream reasoning*.

However, this picture is misleading.

Many real-world failures suggest that something more fundamental is missing — not in the fidelity of object detection, but in how situations are interpreted. In practice, a traffic scene is rarely reducible to object labels alone. Instead, it fundamentally lies in the relationships between objects.

Thus, what is hidden here is a class of errors that do not manifest as misclassification or missed detection, but as misinterpretation of these relationships. 

To illustrate this point, consider several representative incidents that have appeared in public reports over the past decade.
The specific vehicles, locations, and timelines are intentionally omitted here — the structural issues are what matter.

> **Case 1: misinterpreting the environment**
> 
> During highway operation, an Advanced Driver Assistance Systems (ADAS) misclassified a roadside guardrail as part of the sky.
As a result, the system failed to treat it as a physical obstacle, and the collision avoidance mechanism never triggered.

> **Case 2: failure at a railway crossing**
>
> At a road–rail crossing, an ADAS failed to properly interpret a lowered barrier and an approaching train.
The human driver intervened just in time, steering away and colliding with a nearby warning sign instead of entering the crossing.

> **Case 3: a pedestrian that wasn't really a pedestrian**
> 
> During a filming scenario, a camera operator was crouching in the trunk of a leading vehicle while recording footage of a following car equipped with an Automated Driving System (ADS).
The perception module detected the camera operator as a pedestrian and triggered automatic emergency braking.
The abrupt braking caused a collision with a third vehicle approaching from the side.

> **Case 4: a fallen pedestrian**
>
> In another case, a pedestrian suddenly fell on the sidewalk near a driveway.
The ADAS detected the fallen pedestrian and executed an emergency steering maneuver rather than braking, resulting in a collision with an oncoming vehicle.


At first glance, these incidents appear unrelated. The first two seem to involve *recognition failures*.
The latter two appear to involve *decision-making problems* despite correct detection. But viewed from a different perspective, they share a common underlying issue: an *inconsistency* in how the scene should be interpreted. Specifically,
in each case, the system failed to reason about the relationships and interactions of the objects within the scene.

- In Case 1, a large patch of "sky" appearing beneath a mountain ridge should violate basic physical expectations of the world.
- In Case 2, the simultaneous presence of a railway barrier, warning signals, and a large moving object should strongly imply a hazardous situation.
- In Case 3, the detected "pedestrian" was in fact physically attached to the leading vehicle and should have been interpreted as part of a moving platform rather than an independent road user.
- In Case 4, recognizing a fallen pedestrian is only the first step; deciding whether braking or steering is safer requires reasoning about the surrounding traffic configuration.

In all four cases, the failure was not merely about *seeing objects*.
It was about *understanding the scene as a structured system of relationships.*

Yet in many practical system architectures typically organized around modules like **perception** and **planning**, this kind of **scene understanding** often has no clearly defined home. Perception focuses on extracting information from sensor data, while planning assumes that the world model it receives is already semantically coherent. The result is thus an uncomfortable situation: many engineers can sense that something important is missing, yet the architecture itself provides no obvious place for it.

The problem becomes what might be called ***the elephant in the room*** — widely sensed, but rarely addressed explicitly.

## Why Perception Alone Cannot Resolve the Problem

To understand why such failures persist, we need to examine the structural role that perception plays in modern ADS or ADAS.

A common design paradigm assumes a clean separation between perception and decision-making: perception is responsible for extracting a semantically correct representation of the environment, while planning operates on top of this representation to compute actions. This paradigm is often abstracted as:

```mermaid
graph LR
    A[Sensors] -->|Raw Sensor<br>Data| B[Detection and<br>Classification]
    B -->|Object-Level<br>Representation| C[Semantic<br>Segmentation]
    C -->|Semantic Scene<br>Representation| D[Planner]
```

Within this framework, once the environment has been accurately represented — at both the object level (detection, localization, classification) and the scene level (semantic segmentation) — the core difficulty of the problem appears to be largely resolved. Given the maturity of modern planning and control techniques, the remaining task is typically framed as a well-defined optimization problem: *trajectory generation under known constraints*. 
This leads to an appealing division of labor:

> Perception extracts the “facts”, and the planner acts on them.

However, this abstraction hides a critical limitation: 
perception systems fundamentally operate on *observable structure*.
They transform sensor data into representations of *what is present* in the current scene, including  *whch objects are there*, *what are they*, and *where they are*.

Over the past decade, advances in deep learning have significantly improved the reliability of this process.
Modern systems can detect and track agents with high accuracy, and even predict their short-term trajectories with impressive performance. These capabilities are essential.
Without them, autonomous driving would not even be feasible.

Yet they are not sufficient.

Safe driving depends not only on what is observable, but on how the scene **is organized** and **evolves**. *Priority*, *intent*, *occlusion*, *interaction commitment*, *implicit negotiation*, ..., these are not properties of individual objects, but of *relationships* and *configurations*.

Such relational properties are not naturally captured by commonly used semantic representations, which are primarily object-centric and attribute-focused. They are therefore only weakly, if at all, reflected in standard perception metrics such as mAP or detection accuracy.

This creates a fundamental mismatch:

> High perception accuracy does not imply correct understanding of the scene.

This limitation becomes more pronounced in multi-agent environments — a simplified reflection of real traffic — where the key question is rarely just *what objects exist*, but **how interactions may unfold over time**.

Crucially, this is not merely a matter of uncertainty in a probabilistic sense.
What matters is not just *how likely* a future is, but *how many qualitatively different ways* a situation can evolve — each corresponding to a distinct interaction structure.

Consider a pedestrian near the curb. 

At a given moment, the scene may appear static. Yet the situation is inherently *branched*: the pedestrian may remain on the sidewalk or step into the road — two qualitatively different evolutions of the scene, rather than small variations of the same outcome.

Now consider a vehicle ahead.

It is not merely an object labeled *car*, but an agent embedded in an interaction that can:

- yield,
- give way,
- negotiate,
- commit to a maneuver,
- assert priority,
- ...

These are not just variations in motion, but **structured behavioral modes**, defined by the relationships between agents and the implicit rules governing the environment.

Such structure cannot be recovered from a single snapshot, nor inferred purely as a distribution over trajectories. It emerges from reasoning about interactions, intentions, and constraints across agents.

This is exactly where the limitation lies.

Even trajectory prediction models may achieve strong average performance, yet still fail to capture the **branching structure of behavior** — especially in rare but safety-critical situations.


## The Emerging Role of Semantic Reasoning

As discussed in the previous section, the ability to *reason over branching interaction structures* does not naturally reside within perception or trajectory prediction alone. Even with accurate detection and prediction, the relational structure of a scene often remains unresolved.

A natural shift, then, is to introduce an additional layer of processing beyond traditional perception — one that explicitly addresses interpretation, interaction, and ambiguity. This layer is often broadly referred to as **(semantic) reasoning**<sup>[1](#references)</sup>.

This shift is not trivial.

Conventional autonomous driving architectures are built on a strong implicit assumption:
*the perceived world is already semantically resolved*. Under this assumption, the system is organized around a clean separation between perception and downstream components. Perception produces a representation of the environment, and subsequent modules operate on this representation as if it were already coherent and unambiguous.

To incorporate semantic reasoning, this assumption must be relaxed.

Rather than treating perception outputs as fully resolved facts, the system must explicitly account for interpretation, ambiguity, and interaction structure as first-class elements. This suggests the need for a new form of interface — one that sits between semantic representation and downstream decision processes, and supports reasoning over structured, and potentially unresolved, scene semantics.

This is not a new idea.

Over the past several years, both academia and industry have increasingly recognized that safe autonomous driving requires more than accurate perception and optimal motion planning alone. A growing body of research has begun to explore how systems might reason about *the semantic structure of traffic scenes and the behaviors of other agents*.

Different communities have approached this challenge from complementary directions.

### Neural-Based Methods

In the perception and prediction communities, where *neural-based models* are widely applied, one line of work attempts to infer higher-level behavioral information directly from data.

Research on *language-based reasoning*<sup>[2](#references)</sup>, *intent inference*<sup>[3](#references)</sup>, and *multimodal behavior forecasting*<sup>[4](#references)</sup> aims to model not just what agents are doing, but what they *might do next*.

Instead of producing a single predicted trajectory, these models generate multiple candidate modals, each representing a different behavioral hypothesis. For example, whether a nearby vehicle might maintain its lane, yield, or initiate a lane change.

In this view, semantic reasoning is treated as an extension of perception:
*the system learns to map observations to distributions over possible future behaviors, not just trajectories*.

### Symbolic-Based Methods

Meanwhile, the planning and control communities have approached the problem from a different direction leveraging *symbolic-based reasoning frameworks*.

Methods such as *risk-aware control*<sup>[5](#references)</sup>, *game-theoretic decision making*<sup>[6](#references)</sup>, and *contingency planning*<sup>[7](#references)</sup> attempt to explicitly reason about uncertainty in the future behaviors of other agents. Rather than assuming a single predicted future, these approaches evaluate actions against multiple possible scenarios and consider their associated risks.

Here, semantic reasoning is embedded within the decision-making process itself:
*the planner actively reasons about interactions, trade-offs, and possible outcomes before committing to an action*.

At a high level, these approaches share a common intuition:
**safe driving requires structured reasoning about interactions, not just accurate perception of individual objects.**

However, they differ in where this reasoning is placed within the system.

- In neural-based approaches, semantic structure is expected to *emerge implicitly* from data.
- In symbolic-based approaches, it is *explicitly represented* through rules, objectives, or interaction models.

Each direction comes with its own trade-offs.

Neural-based systems can capture rich statistical regularities, but their internal reasoning processes are often difficult to interpret or verify. On the other hand, symbolic-based approaches, offer greater transparency and controllability, but may struggle to scale to the full complexity of real-world environments.

In practice, many modern systems adopt some form of **hybrid architecture**, combining neural perception and prediction with symbolic-based planning and control.

Yet this hybridization introduces another layer of ambiguity: 

- *Where exactly is the boundary between these components?*
- *Who defines the semantic assumptions that govern their interaction?*

These are important questions, but they remain, at their core, technical.

A more fundamental assumption underlies all the approaches discussed so far is that *the semantic structure of a scene is well-defined*, or that there exists a coherent “ground truth” of such a structure which the semantic reasoning module — whether neural-based or symbolic-based — can in principle represent and recover.

But this assumption itself needs to be carefully considered:

> What if the semantics of a scene are not fully well-defined in the first place?

If so, the challenge is no longer just how to perform semantic reasoning, but whether the object of that reasoning, the semantic “truth” of the scene itself, is sound or even well-posed.

## The Nature of Semantic Uncertainty

The discussion so far has implicitly assumed that the semantic structure of a scene, while complex, is ultimately well-defined, and a sufficiently capable system could, in principle, recover its “ground truth” — if it exists.

But this assumption does not always hold.

In real-world traffic, the meaning of a scene is often **not uniquely determined**. It depends on partial observations, latent intentions, and interactions that have not yet unfolded.

One way to think about this is to view a scenario as a carefully structured garden, while a scene is only a partial, immediately visible snapshot of its surface — a projection shaped by the current viewpoint.

Behind each occlusion, around each corner, and along each path lie alternative continuations that are not yet revealed, yet remain entirely plausible given the same scene. No single observer has access to the full structure of this garden.

From this perspective, semantic ambiguity is not only a limitation of sensing or modeling — how precisely we can *describe the garden from a single observation* — but also an inherent property of the environment itself — how well-defined the garden actually is as an object of understanding.

The challenge is, traditional frameworks of uncertainty are not designed to characterize the latter. 

- In machine learning, uncertainty is commonly categorized as **aleatoric** and **epistemic**.
Aleatoric uncertainty arises from stochasticity in the data, while epistemic uncertainty reflects incomplete knowledge that may, in principle, be reduced with more information.

- In control and robotics, uncertainty is typically modeled in terms of numerical variation, such as *noise*, *disturbance*, *bounded modeling error*, and etc. These forms of uncertainty are fundamentally *quantitative*,
assuming that the underlying state of the world is well-defined, even if imperfectly observed.

But semantic uncertainty is different. It does not arise solely from noise or lack of data.
Instead, it arises because *multiple, qualitatively different interpretations of the same scene may be simultaneously valid*.

Consider a simple situation involving a vehicle ahead. 

At the current moment, its position and velocity may be estimated with reasonable accuracy.
Yet its future behavior may branch into multiple possibilities:

- Yielding from the left or from the right, or not yielding at all
- Making or ignoring a commitment
- Asserting or giving up priority
- ...

From the perspective of the system, these are not small variations around a single outcome.

They correspond to *distinct possible futures*, each with different safety implications. This type of uncertainty is therefore not purely numerical, but *structural*. It is not just about *how much* error there is, but about *which world* the system is currently in, or might soon enter.

This distinction has important consequences.

A planner that optimizes for a single most-likely prediction may perform well in typical scenarios,
yet still fail catastrophically when reality follows a less probable branch.

This helps explain a common paradox in autonomous driving: systems can achieve strong performance on aggregate metrics — such as total miles driven or average prediction error — while still exhibiting rare but severe failures.

Such metrics reflect performance under common conditions, but provide limited insight into whether the system has adequately accounted for *the range of plausible semantic evolutions* of a scene.

From this perspective, the core challenge is not simply dealing with noisy measurements or imperfect models.

It is dealing with *a combinatorial space of possible interactions among agents*, where each branch corresponds to a different semantic interpretation of the scene.

## Exposing Semantically Critical Scenarios: A Shift from Parametric Coverage to Semantic Coverage

The dual challenges discussed above — the limitations of system design and the inherent ambiguity of semantic structure — give rise to a fundamental paradox:

- In principle, safe behavior requires reasoning over a vast space of possible interactions.

- In practice, however, no system can explicitly represent them all.

As a result, what ultimately matters is not only how a system reasons, but *which possibilities are ever made visible to it in the first place*.

This is where the problem takes a decisive turn.

If semantic reasoning cannot be fully resolved at the level of system design alone — at least with current approaches — then a primary task in its own right is to *systematically expose the relevant semantic configurations during system validation*.

In this sense, the challenge is no longer purely one of modeling or reasoning about scene semantics. It becomes a question of **exposure**: which semantic structures are encountered, which interactions are explored, and which scenarios — as possible evolutions of these structures — are actually stress-tested.

In current industrial practice, this problem is often framed under a familiar umbrella:

> *the long-tail problem*

Rare events, corner cases, edge scenarios — these terms are widely used to describe situations where autonomous systems tend to fail.

However, this framing is fundamentally insufficient. It treats such cases as statistical outliers,
rather than as manifestations of **missing semantic structure**.

A rare event is not necessarily just unlikely. It may be **systematically absent** from the system’s representation, training process, or evaluation pipeline.

This distinction matters.

If a scenario is merely rare, more data may eventually capture it.
But if a semantic configuration is never explicitly constructed or tested,
it remains invisible — regardless of how much parametric variation or data is collected.

In other words, *long-tail* is not the root cause — *semantic omission* is.

From a testing and validation perspective, this leads to a different objective. The goal is no longer just to accumulate miles or improve average-case performance. It is to *actively identify and construct scenarios* that *expose missing semantic relationships*.

In this sense, the cases discussed earlier in this article are not just isolated failures.
They are examples of the following latent gaps:

- Relationships that were not properly represented;
- Interactions that were not adequately considered;
- Interpretations that were never made explicit.

This suggests a shift from **parametric coverage** to **semantic coverage**.

Instead of asking:

> Have we sufficiently explored the parametric space?

we should ask:

> Have we exposed the right semantic structures?

This perspective is closely aligned with the intent behind **SOTIF (Safety of the Intended Functionality)**,
which emphasizes the systematic identification and reduction of unknown hazardous scenarios.

From this viewpoint, semantic coverage can be understood as a more structural lens on the same problem: **not only expanding the space of tested situations, but making explicit the underlying configurations and assumptions that give rise to potential hazards**.

<div style="text-align: center;">
<img src="blogs/20260316/variation.png" alt="SOTIF" width="640">
</div>

In this view, testing is no longer a downstream verification step. It becomes a primary mechanism for *making semantic uncertainty visible*.

By systematically constructing and exploring *semantic-critical scenarios*, testing can reveal not only where the system fails, but *which parts of the semantic space it has never truly understood*.

## Semantic Reasoning Beyond Technology

At this point, it is useful to step back from the technical details and reconsider what the discussion is actually pointing to.

The issue is no longer just about improving individual components — perception, prediction, or planning — to improve certain metrics for better safety. Nor is it simply about increasing the sophistication or volume of test cases to build confidence in system performance.

What the discussion reveals instead is a deeper structural perspective:

> “Semantic reasoning” is not best understood as a well-defined technical module, but as a name we give to a class of gaps between *current system abstractions* and the *structured nature of real-world interactions*.

These gaps do not arise simply because something is unobserved, nor because it is difficult to model in a conventional sense. They arise when the system lacks a coherent way to represent how interactions are organized, constrained, and may evolve over time.

In this light, “reasoning” does not refer to a standalone capability that can be added or optimized in isolation. Instead, it reflects an attempt to account for this missing layer of structure — one that should sit somewhere in the system, maybe between perception and decision-making, yet is not fully specified in either.

This makes many familiar questions more delicate than they first appear.

For example, it is widely recognized that enumerating test cases or accumulating driving miles is insufficient to guarantee safety.
Yet what is less often examined is that scenarios treated as comparable “cases” may differ fundamentally in their underlying semantic complexity.

Without access to the structure beneath them, these differences remain hidden, but instead compressed into aggregate statistics, or absorbed into a long-tail distribution that obscures their true nature. Thus, what appears as a sparse set of rare events may, in fact, reflect a much richer and largely unexplored space of semantic variation.

From this perspective, identifying the role of semantic reasoning is not a conclusion, but an opening. 

As suggested earlier, the distinction between perception accuracy and scene understanding was never a clean separation to begin with. It is part of a broader continuum that spans perception, prediction, planning, and ultimately testing and validation.

It reveals that beneath the observable performance of a system lies a deeper layer of structure — one that cannot be attributed to any single module, and instead emerges from the interplay between multiple subsystems and the integration of insights across different disciplines.

Seen in this light, the so-called “hidden gap” is not confined to a specific component of the system. Instead, it reflects a limitation in how the problem itself is currently framed.

More precisely, it points to a missing level of abstraction — one that lies between individual system components and the real-world phenomena they are meant to capture. Without a shared understanding at this level, improvements within isolated modules risk becoming locally optimal, while the underlying structural gaps remain unaddressed.

Therefore, addressing this challenge should no more be a matter of advancing a single technique or domain. It requires a more coordinated view — a way for different parts of the system, and the communities that build them, to reason about the same underlying structure with a shared language and aligned assumptions.


## References

1. M. Teichmann, M. Weber, M. Zoellner, R. Cipolla, and R. Urtasun. (2018). *MultiNet: Real-time Joint Semantic Reasoning for Autonomous Driving*. arXiv:1612.07695, https://arxiv.org/abs/1612.07695.
2. M. Diao, L. Yang, H. Yin, Z. Wang, Y. Wang, D. Tian, K. Liang, and Z. Ma. (2026). *DriveRX: A Vision-Language Reasoning Model for Cross-Task Autonomous Driving*. arXiv: 2505.20665，https://arxiv.org/abs/2505.20665.
3. J. Wang, Y. Jin, H. Taghavifar, F. Ding, and C. Wei. (2025). *Socially-Aware Autonomous Driving: Inferring Yielding Intentions for Safer Interactions*. arXiv:2504.20004, https://arxiv.org/abs/2504.20004.
4. L. Zhang, Y. Yuan, C. Wu, X. Chang, X. Cai, S. Zeng, L. Shi, S. Wang, H. Zhang, and M. Xu. (2026). *MindDriver: Introducing Progressive Multimodal Reasoning for Autonomous Driving*. arXiv: 2602.21952, https://arxiv.org/abs/2602.21952.
5. S. Qi, Z. Zhang, Z. Sun, and S. Haesaert. (2026). *Risk-Aware Autonomous Driving with Linear Temporal Logic Specifications*. arXiv:2409.09769，https://arxiv.org/abs/2409.09769.
6. L. Zhang, S. Han, and S. Grammatico. (2025). *Automated Lane Merging via Game Theory and Branch Model Predictive Control*. arXiv:2311.14916, https://arxiv.org/abs/2311.14916.
7. L. Zheng, L. Zhang, P. Yu, Y. Sun, S. Grammatico, J. Ma, and C. Liu. (2026). *Contingency Planning for Safety-Critical Autonomous Vehicles: A Review and Perspectives*. arXiv:2601.14880, https://arxiv.org/abs/2601.14880.