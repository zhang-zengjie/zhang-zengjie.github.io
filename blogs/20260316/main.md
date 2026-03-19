# High Perception Accuracy, Low Context Awareness: The Hidden Gap in Autonomous Driving Safety

> Perception is often seen as a central bottleneck in autonomous driving. However, if perception were perfect, would autonomous driving then be safe? Despite increasingly accurate detection and prediction, systems still fail in ways that are difficult to anticipate. There appears to be a persistent but hidden gap, one that is not yet captured by standard notions of accuracy. What exactly is missing? And more importantly, how can we make it visible?

Modern autonomous driving systems have made remarkable progress in perception. Benchmarks continue to report near-saturated performance on object detection, segmentation, and tracking. Yet, high-profile failures and long-tail incidents persist — not as outliers in noise, but as indicators of a deeper structural issue.

A fundamental question is then raised:

> If systems can already “see” the world with high accuracy, why do they still fail to behave safely within it?


At the heart of this question lies a subtle but critical distinction: the relationship between **perception accuracy** and **context awareness**.
The former measures whether the system sees correctly, while the latter concerns whether the system understands reasonably.

Here, *context* refers to the relational structure of a scene, i.e., how relevant objects relate to each other, what constraints these relationships impose, and what behaviors they enable or prohibit. 
A system may detect objects with high precision, yet still fail to interpret what those objects mean in context.

In other words: *seeing correctly does not necessarily imply understanding correctly*.

> Perception accuracy is therefore not a sufficient condition for correct contextual understanding.

Crucially, this gap is often invisible in standard evaluation pipelines. Aggregate metrics such as *mean Average Precision (mAP)* or *prediction accuracy* implicitly assume that correctness at the level of individual objects composes into correctness at the system level.

However, this assumption breaks down in complex, real-world interactions, especially near the boundaries of a system’s operational assumptions, and in multi-agent settings where behavior emerges not from isolated entities, but from their *coupled interactions*, *implicit coordination*, and *dynamically evolving dependencies*.

## The Elephant in the Room

A common implicit assumption in many system designs is that improving perception accuracy will eventually resolve higher-level interpretation challenges.
A more precise way to describe this is:
*the dominant system paradigm assumes a clean separation between perception and decision-making, where semantic correctness at the perception layer is sufficient for downstream reasoning*.

However, this picture is misleading.

Many real-world failures suggest that something more fundamental is missing — not in the fidelity of object detection, but in how situations are interpreted within their context. In fact, context in traffic is rarely reducible to object labels alone. Instead, it fundamentally lies in the relationships between objects.

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
in each case, the system failed to reason about the relationships and context within the scene.

* In Case 1, a large patch of "sky" appearing beneath a mountain ridge should violate basic physical expectations of the world.
* In Case 2, the simultaneous presence of a railway barrier, warning signals, and a large moving object should strongly imply a hazardous situation.
* In Case 3, the detected "pedestrian" was in fact physically attached to the leading vehicle and should have been interpreted as part of a moving platform rather than an independent road user.
* In Case 4, recognizing a fallen pedestrian is only the first step; deciding whether braking or steering is safer requires reasoning about the surrounding traffic configuration.

In all four cases, the failure was not merely about *seeing objects*.
It was about *understanding the scene as a structured system of relationships.*

Yet in many practical system architectures typically organized around modules like **perception** and **planning**, this kind of **awareness** often has no clearly defined home. Perception focuses on extracting information from sensor data, while planning assumes that the world model it receives is already semantically coherent. The result is thus an uncomfortable situation:
many engineers can sense that something important is missing, yet the architecture itself provides no obvious place for it.

The problem becomes what might be called ***the elephant in the room*** — widely sensed, but rarely addressed explicitly.

## Why Perception Alone Cannot Resolve the Problem

To understand why such failures persist, we need to examine the structural role that perception plays in modern ADS or ADAS.

A common design paradigm assumes a clean separation between perception and decision-making: perception is responsible for extracting a semantically correct representation of the environment, while planning operates on top of this representation to compute actions. This paradigm is often abstracted as:

```
Raw Sensor Data → Object-Level Representation → Semantic Scene Representation → Planner
```

Within this framework, once objects are correctly detected, localized, and classified, the core difficulty of the problem appears to be largely resolved.
Given the maturity of modern planning and control techniques, the remaining task is typically framed as a well-defined optimization problem: *trajectory generation under known constraints*. 
This leads to an appealing division of labor:

> Perception extracts the “facts”, and the planner acts on them.

However, this abstraction hides a critical limitation: 
perception systems fundamentally operate on *observable structure*.
They transform sensor data into representations of *what is present* in the current scene, including  *whch objects are there*, *what are they*, and *where they are (up to)*.

Over the past decade, advances in deep learning have significantly improved the reliability of this process.
Modern systems can detect and track agents with high accuracy, and even predict their short-term trajectories with impressive performance. These capabilities are essential.
Without them, autonomous driving would not even be feasible.

Yet they are far from sufficient.

Safe driving depends not only on what is observable, but on how the scene is *organized* and *evolves*. *Priority*, *intent*, *occlusion*, *interaction commitment*, *implicit negotiation*, ..., these are not properties of individual objects, but of *relationships* and *configurations*.

Such relational properties are not naturally captured by prevailing semantic representations, which are primarily object-centric and attribute-focused.
They are therefore only weakly, if at all, reflected in standard perception metrics such as mAP or detection accuracy.

This creates a fundamental mismatch:

> High perception accuracy does not imply correct understanding of the scene.

This limitation becomes more pronounced in multi-agent environments, a simplified reflection of real traffic, where the key question is rarely just *what objects exist*, but **how interactions may unfold over time**.

Crucially, this is not merely a matter of uncertainty in a probabilistic sense.
What matters is not just *how likely* a future is, but *how many qualitatively different ways* a situation can evolve — each corresponding to a distinct interaction structure.

Consider a pedestrian near the curb.
At a given moment, the scene may appear static. Yet the situation is inherently *branched*: the pedestrian may remain on the sidewalk or step into the road — two qualitatively different evolutions of the scene, rather than small variations of the same outcome.

Now consider a vehicle ahead.
It is not merely an object labeled *car*, but an agent embedded in an interaction:

* yielding
* giving way
* negotiating
* committing to a maneuver
* asserting priority

These are not just variations in motion, but **structured behavioral modes**, defined by the relationships between agents and the implicit rules governing the environment.

Such structure cannot be recovered from a single snapshot, nor inferred purely as a distribution over trajectories.
It emerges from reasoning about interactions, intentions, and constraints across agents.

This is exactly where the limitation lies.
Even trajectory prediction models may achieve strong average performance, yet still fail to capture the **branching structure of behavior** — especially in rare but safety-critical situations.



## The Emerging Role of Semantic Reasoning

As discussed in the previous section, semantic understanding does not naturally reside within perception or trajectory prediction alone. Even with accurate detection and prediction, the relational structure of a scene often remains unresolved. Then, a natural shift is to implement semantic reasoning in the decision-making layer.

This shift is not trivial. 

Traditional planning modules are built on a strong implicit assumption: *the perceived world is already semantically resolved*. They operate on detected objects and predicted trajectories as if the environment were already coherent and unambiguous, reducing decision-making to an optimization problem over a known world model.

Thus, to incorporate semantic reasoning, this assumption must be relaxed: *the planner must reason about interpretation, ambiguity, and interaction structure as part of the decision process itself*.

This is not a new idea.

Over the past several years, both academia and industry have increasingly recognized that safe autonomous driving requires more than accurate perception and optimal motion planning alone.
A growing body of research has begun to explore how systems might reason about *the semantic structure of traffic scenes and the behaviors of other agents*.

Different communities have approached this challenge from complementary directions.

### Neural-Based Methods

In the perception and prediction communities, where *neural-based models* are widely applied, one line of work attempts to infer higher-level behavioral information directly from data.

Research on *behavior prediction*, *intent inference*, and *multimodal trajectory forecasting* aims to model not just what agents are doing, but what they *might do next*.
Instead of producing a single predicted trajectory, these models generate multiple candidate futures, each representing a different behavioral hypothesis. For example, whether a nearby vehicle might maintain its lane, yield, or initiate a lane change.

In this view, semantic reasoning is treated as an extension of perception:
*the system learns to map observations to distributions over possible future behaviors, not just trajectories*.

### Symbolic-Based Methods

Meanwhile, the planning and control communities have approached the problem from a different direction leveraging *symbolic reasoning frameworks*.

Methods such as *risk-aware control*, *game-theoretic decision making*, and *contingency planning* attempt to explicitly reason about uncertainty in the future behaviors of other agents. Rather than assuming a single predicted future, these approaches evaluate actions against multiple possible scenarios and consider their associated risks.

Here, semantic reasoning is embedded within the decision-making process itself:
*the planner actively reasons about interactions, trade-offs, and possible outcomes before committing to an action*.

At a high level, these approaches share a common intuition:
**safe driving requires structured reasoning about interactions, not just accurate perception of individual objects.**

However, they differ in where this reasoning is placed within the system.

* In neural-based approaches, semantic structure is expected to *emerge implicitly* from data.
* In symbolic-based approaches, it is *explicitly represented* through rules, objectives, or interaction models.

Each direction comes with its own trade-offs.

Neural-based systems can capture rich statistical regularities, but their internal reasoning processes are often difficult to interpret or verify.
On the other hand, symbolic-based approaches, offer greater transparency and controllability, but may struggle to scale to the full complexity of real-world environments.

In practice, many modern systems adopt some form of **hybrid architecture**, combining neural perception and prediction with symbolic-based planning and control.

Yet this hybridization introduces another layer of ambiguity: *Where exactly is the boundary between these components*?
*Who defines the semantic assumptions that govern their interaction*?

These are important questions, but they remain, at their core, technical.

A more fundamental assumption underlies all the approaches discussed so far is that *the semantic structure of a scene is well-defined*, or that there exists a coherent “ground truth” of context which the semantic reasoning module, whether neural-based or symbolic-based, can in principle represent and recover.

But this assumption itself deserves scrutiny:

> What if the semantics of a scene are not fully well-defined in the first place?

If so, the challenge is no longer just how to perform semantic reasoning, but whether the object of that reasoning, the semantic “truth” of the scene itself, is sound or even well-posed.

## The Nature of Semantic Uncertainty

The discussion so far has implicitly assumed that the semantic structure of a scene, while complex, is ultimately well-defined — that there exists a coherent “ground truth” of context that a sufficiently capable system could, in principle, recover.

But this assumption does not always hold.

In real-world traffic, the meaning of a scene is often **not uniquely determined**.
It depends on partial observations, latent intentions, and interactions that have not yet unfolded. 
In this sense, semantic ambiguity is not only a limitation of sensing or modeling, but also an inherent property of the environment itself.

However, traditional frameworks of uncertainty are not designed to capture this phenomenon. 

In machine learning, uncertainty is commonly categorized as **aleatoric** and **epistemic**.
Aleatoric uncertainty arises from stochasticity in the data, while epistemic uncertainty reflects incomplete knowledge that may, in principle, be reduced with more information.

In control and robotics, uncertainty is typically modeled in terms of numerical variation, such as *noise*, *disturbance*, *bounded modeling error*, and etc. These forms of uncertainty are fundamentally *quantitative*,
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
They correspond to *distinct possible futures*, each with different safety implications. This type of uncertainty is therefore not purely numerical, but *structural*. It is not just about *how much* error there is,
but about *which world* the system is currently in, or might soon enter.

This distinction has important consequences.

A planner that optimizes for a single most-likely prediction may perform well in typical scenarios,
yet still fail catastrophically when reality follows a less probable branch.

This helps explain a common paradox in autonomous driving:
systems can achieve strong performance on aggregate metrics — such as total miles driven or average prediction error — while still exhibiting rare but severe failures.

Such metrics reflect performance under common conditions,
but provide limited insight into whether the system has adequately accounted for **the range of plausible semantic evolutions** of a scene.

From this perspective, the core challenge is not simply dealing with noisy measurements or imperfect models.

It is dealing with **a combinatorial space of possible interactions among agents**,
where each branch corresponds to a different semantic interpretation of the scene.


## Exposing Semantically Critical Scenarios: A Shift from Data Coverage to Semantic Coverage

The dual challenges discussed above — the limitations of system design and the inherent ambiguity of semantic structure — give rise to a fundamental paradox:

In principle, safe behavior requires reasoning over a vast space of possible interactions.
In practice, however, no system can explicitly represent or enumerate them all.

As a result, what ultimately matters is not only how a system reasons,
but **which possibilities are ever made visible to it in the first place**.

This is where the problem should take a decisive turn.

If semantic reasoning cannot be fully resolved at the level of system design alone,
then **exposing the right semantic configurations becomes a primary task in its own right**.

In this sense, the challenge is no longer purely one of modeling or reasoning.
It becomes a question of **exposure**:
which structures are encountered, which interactions are explored, and which scenarios are actually stress-tested.

---

In current industrial practice, this problem is often framed under a familiar umbrella:

> *the long-tail problem*

Rare events, corner cases, edge scenarios — these terms are widely used to describe situations where autonomous systems tend to fail.

However, this framing is fundamentally insufficient.

It treats such cases as statistical outliers,
rather than as manifestations of **missing semantic structure**.

A rare event is not necessarily just unlikely.
It may be **systematically absent** from the system’s representation, training process, or evaluation pipeline.

---

This distinction matters.

If a scenario is merely rare, more data may eventually capture it.
But if a semantic configuration is never explicitly constructed or tested,
it remains invisible — regardless of how much data is collected.

In this sense:

```
long-tail ≠ root cause  
semantic omission = root cause
```

---

From a testing and validation perspective, this leads to a different objective.

The goal is no longer just to accumulate miles or improve average-case performance.
It is to **actively identify and construct scenarios that expose missing semantic relationships**.

The cases discussed earlier in this article are not just isolated failures.
They are examples of such gaps:

* relationships that were not properly represented
* interactions that were not adequately considered
* interpretations that were never made explicit

---

This suggests a shift from **data coverage** to **semantic coverage**.

Instead of asking:

> Have we seen enough data?

we must ask:

> Have we exposed the right structures?

---

In this view, testing is no longer a downstream verification step.
It becomes a primary mechanism for **making semantic uncertainty visible**.

By systematically constructing and exploring edge-case interactions,
testing can reveal not only where the system fails,
but **which parts of the semantic space it has never truly understood**.


## Is It All About Awareness?

From this perspective, the issue is not merely one of improving perception, prediction, or planning in isolation.
Nor is it simply a matter of incorporating more sophisticated cases into the system.

What emerges instead is a more subtle observation:

**semantic reasoning is not just a technical paradigm to be grounded, but also a notion — a symbolic anchor for a wide class of structural unknowns in interactive environments that current system abstractions do not fully capture.**

It points to aspects of the environment that are neither purely perceptual nor purely decision-theoretic,
but arise from the organization of interactions, constraints, and latent possibilities.

In this sense, what we often refer to as “reasoning” is less a specific capability,
but more an attempt to engage with a layer of structure that remains only partially articulated.

This makes many familiar questions more delicate than they first appear.

For example, it is widely recognized that enumerating test cases or accumulating driving miles is insufficient to guarantee safety.
Yet what is less often examined is that scenarios treated as comparable “cases” may differ fundamentally in their underlying semantic complexity.

Without access to the structure beneath them,
these differences remain hidden, but instead compressed into aggregate statistics, or absorbed into a long-tail distribution that obscures their true nature.

What appears as a sparse set of rare events may, in fact, reflect a much richer and largely unexplored space of semantic variation.

From this perspective, identifying the role of semantic reasoning is not a conclusion, but an opening. 

As suggested earlier, the distinction between perception accuracy and context awareness was never a clean separation to begin with.
It is part of a broader continuum that spans perception, prediction, planning, and ultimately testing and validation.

It reveals that beneath the observable performance of a system lies a deeper layer of structure — one that cannot be attributed to any single module, and instead emerges from the interplay between multiple subsystems and the integration of insights across different disciplines.

Seen in this light, the so-called “hidden gap” is not confined to a specific component.
It reflects a limitation in how the problem itself is currently framed.

More precisely, it points to a missing level of abstraction — one that lies between individual system components and the real-world phenomena they are meant to capture.
Without a shared understanding at this level, improvements within isolated modules risk becoming locally optimal, while the underlying structural gaps remain unaddressed.

Addressing this challenge is therefore not a matter of advancing a single technique or domain.
It requires a more coordinated view — a way for different parts of the system, and the communities that build them, to reason about the same underlying structure with a shared language and aligned assumptions.
