> Autonomous driving has been “around the corner” for more than a decade.
> 
> Yet the gap between impressive demonstrations and provable safety remains stubbornly wide.
We can generate increasingly realistic behaviors,  but can we explain their limits?
And more importantly, can we certify whether they are 'realistic'?

Over the past few years, scenario-based testing has become one of the dominant paradigms in the validation and verification of autonomous driving systems and other safety-critical AI-enabled systems. The motivation is straightforward: real-world testing is expensive, slow, and often dangerous, while simulation-based testing allows developers to explore a much larger space of possible system behaviors at a fraction of the cost.
 
With the recent breakthroughs in large language models (LLM) and generative AI, an increasing number of startups and research efforts have begun to rely on AI-driven scenario generation. These approaches promise rapid synthesis of diverse and complex driving situations, including rare or long-tail scenarios that are difficult to collect from real-world data. As a result, AI-based scenario generation is often perceived as a natural and even sufficient solution to the problem of test coverage.

However, this perception might be misleading.

While AI-driven scenario generation is undoubtedly a powerful tool, it does not,  and fundamentally cannot,  address some of the core requirements of safety assurance in autonomous systems. In particular, generating a large number of scenarios, no matter how diverse they appear, does not constitute a guarantee of safety, nor does it provide a principled understanding of system failure boundaries.

This article argues that scenario generation alone is insufficient for safety-critical validation, and that formal methods are a necessary complement. The goal is not to replace AI-based approaches, but to clarify their limitations and to explain why formal specification and verification remain indispensable when safety, accountability, and regulatory compliance are at stake.

## The Rise of Scenario-Based Testing and the Coverage Illusion

Scenario-based testing emerged as a response to the limitations of traditional test-case-driven validation. In early autonomous driving development, test scenarios were often manually designed by engineers, focusing on well-known situations such as lane changes, car-following, or pedestrian crossings. While effective for basic functionality, this approach quickly became unscalable as system complexity increased.

Simulation platforms enabled a shift toward parameterized and combinatorial scenarios, allowing developers to systematically vary environmental conditions, traffic participants, and agent behaviors. This shift significantly improved test efficiency and made it possible to explore corner cases that are rarely observed in real-world driving data.

More recently, generative AI techniques have been introduced to further automate this process. LLM and data-driven generative models can synthesize scenario descriptions, traffic behaviors, and even full simulation configurations based on high-level prompts. These methods are attractive because they reduce manual effort and appear to offer broad coverage of the scenario space.

However, a side effect of this is that scenario coverage is often implicitly treated as a proxy for safety, leading to what might be called a **coverage illusion**: if enough scenarios have been tested, the system is assumed to be safe enough for deployment.

This assumption, however, deserves closer scrutiny.

At first glance, scenario-based testing appears to offer systematic coverage. Engineers define scenarios such as cut-ins, unprotected left turns, pedestrian crossings, or merging behaviors, then vary parameters like speed, distance, timing, and weather conditions. With sufficient automation and computational resources, thousands, or even millions, of such scenarios can be generated and simulated.

But this intuitive perspective masks a deeper issue: **scenario enumeration samples isolated points in an underlying continuous state space**.

Autonomous driving systems operate over continuous variables: positions, velocities, accelerations, perception uncertainties, controller states, and internal neural representations. Safety-critical failures often occur not at typical operating points, but near **structured boundaries**,  for example, when time-to-collision (TTC) approaches a critical threshold, when perception confidence degrades gradually, or when multiple subsystems interact in rare but feasible configurations.

Public disengagement reports released by the California Department of Motor Vehicles (DMV) consistently show that safety drivers intervene in situations involving subtle, compound interactions rather than textbook scenarios. Similarly, investigations by the U.S. National Transportation Safety Board (NTSB), including the 2018 Uber ATG fatal crash, highlight failures arising from edge cases that were not explicitly represented as predefined scenarios, despite extensive testing.

In other words, **the absence of a scenario does not imply the absence of risk**.

## AI-Generated Scenarios: A Structural Solution or a Statistical Shortcut?

The recent success of LLM and generative AI has significantly accelerated interest in automated scenario generation. Unlike traditional scenario enumeration, which produces isolated test cases, AI-driven approaches reconstruct scenarios from data distributions. In doing so, they implicitly embed a probabilistic measure over the scenario space, sampling from a learned latent representation rather than manually enumerating discrete cases. The sampling process can be steered through conditioning signals,  in LLM-based systems, these signals are commonly referred to as prompts.

This shift is not trivial.

By learning from historical logs, simulation traces, or textual descriptions, generative models approximate the statistical structure of real-world traffic interactions. In effect, they reconstruct a latent scenario manifold and generate samples that are diverse, plausible, and distributionally grounded. To some extent, this moves beyond naïve enumeration and partially addresses the combinatorial explosion inherent in handcrafted scenario design.

However, this reconstruction remains statistical rather than structural.

AI-generated scenarios are still constrained by:

- The data distribution from which they are derived
- Implicit priors favoring common or plausible behaviors
- Optimization objectives that emphasize realism and diversity over adversarial boundary exploration

As a result, generative models tend to reinforce the statistical center of the distribution. Safety violations, by contrast, often reside in low-probability regions,  at the tails, along discontinuities, or near adversarial boundaries of the state space.

This is not merely a theoretical concern. Research in falsification-based testing and rare-event analysis has consistently shown that unguided random or learned sampling struggles to discover safety violations unless it is explicitly steered toward unsafe regions. Industrial simulation platforms increasingly recognize this limitation by introducing coverage metrics, constraint-based testing, and robustness measures, rather than relying solely on scenario counts or statistical diversity.

Even the ISO 21448 standard (Safety of the Intended Functionality, SOTIF) explicitly acknowledges that hazardous behavior may arise without system faults, particularly due to performance limitations or unforeseen operational conditions. This perspective implicitly moves beyond enumerated scenarios and toward systematic exploration of unsafe behaviors.

At the core of AI-driven scenario generation lies an implicit assumption: that the learned distribution is sufficiently representative of the space of possible failures. Yet generative models are optimized to reproduce what is plausible and statistically consistent with their training data,  not to guarantee coverage of critical unsafe behaviors. This means, while such models may occasionally extrapolate beyond observed samples, their objective functions do not explicitly target the discovery of structurally rare or previously unobserved failure modes. 

This becomes particularly consequential in the context of SOTIF, where the goal is to progressively reduce the region of unknown unsafe behaviors. A data-driven generator can explore what it has learned to approximate; it cannot, by design alone, ensure systematic pressure on the truly unknown.

<div style="text-align: center;">
<img src="blogs/20260220/sotif.png" alt="SOTIF" width="300">
</div>

> *Fig 1. The SOTIF safety matrix from ISO Standard 21448 showcasing scenario categories. The goal is to compress the region 3 by systematically (not just statistically) transferring unknown hazardous scenarios into known ones.*

Generative models reduce uncertainty in probability space; SOTIF seeks to reduce uncertainty in knowledge space. The two are related, but not equivalent, because statistical reconstruction does not imply structural completeness.
From a safety assurance standpoint, this distinction is decisive. Safety is not concerned with what is likely to happen, but with what must not happen. Rare events, adversarial interactions, and subtle structural combinations often lie outside the support of the learned distribution and may never be generated,  regardless of how sophisticated the model becomes.


## Safety Is About Boundaries, Not Instances

The core limitation of scenario-based testing can be summarized succinctly:

> **Scenarios describe instances; safety violations emerge at boundaries.**

From a systems and control perspective, safety properties define constraints over trajectories, not over isolated snapshots. Whether expressed as minimum distance, bounded acceleration, or temporal logic specifications, safety requirements delineate regions of acceptable behavior in a continuous space.

Enumerating scenarios,  no matter how many,  does not guarantee that these boundaries are adequately explored. AI-driven scenario generation improves this situation by reconstructing scenarios from data distributions, implicitly embedding a measure over the scenario space and sampling from a learned latent representation. In principle, this allows exploration of regions that are more likely according to historical data, providing a structured, distribution-aware alternative to naïve enumeration.

However, this approach remains fundamentally statistical rather than structural. The regions sampled are constrained by the learned distribution and the conditioning signals (prompts, in the case of LLM-driven generation), which influence the latent space but do not guarantee coverage of critical boundaries. As a result, AI-generated scenarios may still miss rare or adversarial behaviors that lie outside the typical data manifold.

This is why many safety-critical domains, including avionics and industrial control, rely on formal methods to complement testing. Formal verification, reachability analysis, and specification-based falsification are not replacements for scenarios; rather, they provide the structural guarantees that neither discrete enumeration nor AI-driven generation alone can offer.

For autonomous driving, the challenge is not generating more scenarios, but **understanding which regions of the system’s behavior space remain untested, and why**.

<div style="text-align: center;">
<img src="blogs/20260220/boundary.svg" alt="SOTIF" width="700">
</div>

> *Fig 2. Scenario-based testing samples isolated points in a continuous state space, while safety violations typically occur near structured boundaries. Increasing the number of scenarios does not guarantee coverage of these critical regions.*

## How Formal Methods Complement Scenario-Based Testing

Scenario-based testing answers:

> **“What happens in these situations?”**

Formal methods, by contrast, focus on a deeper question:

> **“What cannot happen, regardless of the situation?”**

This distinction is crucial. Scenario testing and formal methods are not competitors, they are complementary layers in a safety assurance stack. While scenarios explore possibilities, formal methods define boundaries, constraints, and invariants that ensure safety **beyond any individual instance**.

### From Instances to Structural Guarantees

Scenarios examine isolated points in the system’s behavior space. Formal methods shift the lens:

- from discrete scenarios
- to **sets of behaviors**, implicitly defined through mathematical or logical constraints

Safety is rarely about a single cut-in at a specific speed; it is about ensuring that **all admissible variations within a defined envelope** respect collision avoidance, bounded deceleration, or temporal response limits.

In this sense, formal methods define the **shape and boundaries** of safe behavior, turning an intractable enumeration problem into a tractable structural analysis.

### Semantic Coverage vs. Scenario Counts

One of the most powerful contributions of formal methods is their ability to provide **coverage at the structural level**:

- Which regions of the state or behavior space are provably safe?
- Which are provably unsafe?
- Which remain unknown or under-specified?

Rather than asking *“Did we generate enough scenarios?”*, formal reasoning reframes the question as *“Which behaviors are not yet constrained by our safety definitions?”*

Even AI-driven scenario generators benefit from this framing. Statistical diversity or latent-space reconstruction can improve coverage superficially, but without formally defined constraints, they may still miss rare or boundary-critical behaviors. Formal specifications act as a **compass** for scenario exploration, focusing attention where it matters.

### Scenarios as Witnesses, Not Proof

In a framework where formal methods clearly define the boundaries of safety, scenarios are no longer standalone evidence of safety, they are **witnesses**:

- Passing scenarios witness consistency with a safety property.
- Failing scenarios witness the existence of a counterexample.

Each scenario becomes traceable to a formal property, a fragile rule in a knowledge base, a region of the state space, or a set of assumptions. This traceability is what regulators, safety boards, and engineering teams increasingly require. It turns simulation outputs from isolated data points into **structured evidence** aligned with a defined operational model.

### From Parameter Spaces to Semantic Spaces

A common misconception is that formal methods must reason over raw continuous parameters, positions, velocities, accelerations, weather, timing offsets, which seems intractable.

The key insight is **semantic abstraction**: scenarios are defined not as raw vectors, but as objects with roles, relations, temporal structure, and context, often expressed in grammars or operational models (e.g., ODD, OpenSCENARIO).

Formal reasoning operates over this **semantic scenario space**, not over every physically possible combination. It ensures completeness, consistency, and coverage **relative to meaningful behaviors**, rather than raw physics.

In other words, formal methods:

- define valid scenario structures
- constrain admissible agent interactions
- provide guarantees at the level of semantic organization

This reframing aligns perfectly with scenario-based testing: the scenarios themselves remain concrete and interpretable, but now they are **anchored in structural safety reasoning**.

### Strategic Positioning

The most subtle but powerful effect of this perspective is organizational and conceptual:

- Scenarios remain the interface engineers interact with.
- Formal methods operate underneath, defining boundaries and guarantees.
- Safety questions shift from “Did we test enough?” to “Have we consistently and completely described operationally relevant behaviors?”

At this point, formal methods are **normalized as infrastructure**: they are not a tool to debate, but the foundational layer that gives meaning and structure to scenario-based testing.

<div style="text-align: center;">
<img src="blogs/20260220/formal.svg" alt="SOTIF" width="700">
</div>

> *Fig 2. Semantic scenario space for autonomous driving: blue points show randomly generated or AI-driven scenarios, while orange points represent formal-method-guided exploration focused on the safety boundary. Black curve denotes the formally defined safety boundary, and the red shaded area highlights regions of potential safety violations. This illustrates how formal methods provide structural guidance to scenario exploration, enabling efficient and targeted coverage of critical behaviors.*

## Why Formal Methods Create Commercial Leverage, Not Just Technical Rigor

Formal methods are often framed as instruments of mathematical rigor. In safety-critical autonomy, however, their deeper value lies elsewhere: they convert transient simulation outputs into persistent, interpretable assets.

Large-scale simulation consumes enormous computational resources. However, without structural anchors, its results remain episodic, impressive in volume, but difficult to reuse, audit, or compare across iterations. Formal specifications introduce continuity and traceability by defining explicit safety properties, assumption boundaries, and measurable robustness signals that persist beyond any single experiment. In this sense, scenario-based testing would no longer be a series of isolated test runs, but a structured body of evidence chains.

This persistence has direct economic consequences. Simulation effort is no longer discarded with each software update. Safety claims can be traced months or years later. Coverage discussions become comparable across architectures and teams. The result is not merely stronger technical guarantees, but lower marginal cost of iteration and reduced uncertainty in long development cycles.

As deployment approaches, the center of gravity shifts further, from performance to explanation. Regulators, partners, and internal stakeholders do not ask how many scenarios were generated. They ask which safety claims are being made, under what assumptions, and how those claims are justified. Scenario generation alone does not naturally provide this chain of reasoning. Formal specifications do. They make safety explicit, measurable, and reviewable, transforming simulation output into certifiable evidence.

More subtly, formal methods reshape organizations. They establish a shared semantic interface: engineers reason about guarantees, simulation teams target boundary conditions, and management tracks risk as a quantified signal rather than a narrative. In this way, technical discipline becomes operational leverage.

## Toward Specification-Centered Testing

The deeper shift is conceptual. Autonomy testing is no longer defined by the number of scenarios executed, but by how safety measures are characterized and maintained along iterations. Scenario-centric workflows may scale poorly as systems grow since a scenario involves the multiplication of the parameter spaces of all traffic elements. Once the testing configuation is updated, all scenarios need to be regenerated and tested. Specification-centered platforms, however, invert the problem by giving a hint on what must always hold and where system robustness is weakest. In this sense, scenarios become instruments for probing those properties, not artifacts to be accumulated.

Within such a framework, AI and formal methods are not competitors. AI explores possibilities while formal methods govern the boundaries. Specifications define semantic targets while generative models stress those targets. Safety evolves from an implicit by-product of testing to an explicit and continuously tracked signal.

Therefore, the advantage of specification-centered testing is structural and systematic. By anchoring safety in explicit robustness measures, simulation effort is converted into durable and iteratable knowledge. This is the true difference to the conventional scenario-centered testing framework. This is not a technique confined to automated vehicles. It reflects a broader shift in how safety-critical systems are engineered: *from accumulating scenarios to structuring guarantees*. The same logic extends naturally to robotics, aerospace, and other domains where safety must be specified and continuously defended.