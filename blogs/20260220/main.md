> Autonomous driving has been “around the corner” for more than a decade.
> 
> Yet the gap between impressive demonstrations and provable safety remains stubbornly wide.
We can generate increasingly realistic behaviors — but can we explain their limits?
And more importantly, can we certify them?

Over the past few years, scenario-based testing has become one of the dominant paradigms in the validation and verification of autonomous driving systems and other safety-critical AI-enabled systems. The motivation is straightforward: real-world testing is expensive, slow, and often dangerous, while simulation-based testing allows developers to explore a much larger space of possible system behaviors at a fraction of the cost.
 
With the recent breakthroughs in large language models (LLM) and generative AI, an increasing number of startups and research efforts have begun to rely on AI-driven scenario generation. These approaches promise rapid synthesis of diverse and complex driving situations, including rare or long-tail scenarios that are difficult to collect from real-world data. As a result, AI-based scenario generation is often perceived as a natural and even sufficient solution to the problem of test coverage.

However, this perception might be misleading.

While AI-driven scenario generation is undoubtedly a powerful tool, it does not — and fundamentally cannot — address some of the core requirements of safety assurance in autonomous systems. In particular, generating a large number of scenarios, no matter how diverse they appear, does not constitute a guarantee of safety, nor does it provide a principled understanding of system failure boundaries.

This article argues that scenario generation alone is insufficient for safety-critical validation, and that formal methods are a necessary complement. The goal is not to replace AI-based approaches, but to clarify their limitations and to explain why formal specification and verification remain indispensable when safety, accountability, and regulatory compliance are at stake.

## **The Rise of Scenario-Based Testing and the Coverage Illusion**

Scenario-based testing emerged as a response to the limitations of traditional test-case-driven validation. In early autonomous driving development, test scenarios were often manually designed by engineers, focusing on well-known situations such as lane changes, car-following, or pedestrian crossings. While effective for basic functionality, this approach quickly became unscalable as system complexity increased.

Simulation platforms enabled a shift toward parameterized and combinatorial scenarios, allowing developers to systematically vary environmental conditions, traffic participants, and agent behaviors. This shift significantly improved test efficiency and made it possible to explore corner cases that are rarely observed in real-world driving data.

More recently, generative AI techniques have been introduced to further automate this process. LLM and data-driven generative models can synthesize scenario descriptions, traffic behaviors, and even full simulation configurations based on high-level prompts. These methods are attractive because they reduce manual effort and appear to offer broad coverage of the scenario space.

However, a side effect of this is that scenario coverage is often implicitly treated as a proxy for safety, leading to what might be called a **coverage illusion**: if enough scenarios have been tested, the system is assumed to be safe enough for deployment.

This assumption, however, deserves closer scrutiny.

At first glance, scenario-based testing appears to offer systematic coverage. Engineers define scenarios such as cut-ins, unprotected left turns, pedestrian crossings, or merging behaviors, then vary parameters like speed, distance, timing, and weather conditions. With sufficient automation and computational resources, thousands—or even millions—of such scenarios can be generated and simulated.

Yet this apparent breadth masks a deeper issue: **scenario enumeration samples isolated points in an underlying continuous state space**.

Autonomous driving systems operate over continuous variables: positions, velocities, accelerations, perception uncertainties, controller states, and internal neural representations. Safety-critical failures often occur not at typical operating points, but near **structured boundaries** — for example, when time-to-collision (TTC) approaches a critical threshold, when perception confidence degrades gradually, or when multiple subsystems interact in rare but feasible configurations.

Public disengagement reports released by the California Department of Motor Vehicles consistently show that safety drivers intervene in situations involving subtle, compound interactions rather than textbook scenarios. Similarly, investigations by the U.S. National Transportation Safety Board (NTSB), including the 2018 Uber ATG fatal crash, highlight failures arising from edge cases that were not explicitly represented as predefined scenarios, despite extensive testing.

In other words, **the absence of a scenario does not imply the absence of risk**.

## **AI-Generated Scenarios: A Structural Solution or a Statistical Shortcut?**

The recent success of LLM and generative AI has significantly accelerated interest in automated scenario generation. Unlike traditional scenario enumeration, which produces isolated test cases, AI-driven approaches reconstruct scenarios from data distributions. In doing so, they implicitly embed a probabilistic measure over the scenario space, sampling from a learned latent representation rather than manually enumerating discrete cases. The sampling process can be steered through conditioning signals — in LLM-based systems, these signals are commonly referred to as prompts.

This shift is not trivial.

By learning from historical logs, simulation traces, or textual descriptions, generative models approximate the statistical structure of real-world traffic interactions. In effect, they reconstruct a latent scenario manifold and generate samples that are diverse, plausible, and distributionally grounded. To some extent, this moves beyond naïve enumeration and partially addresses the combinatorial explosion inherent in handcrafted scenario design.

However, this reconstruction remains statistical rather than structural.

AI-generated scenarios are still constrained by:

- The data distribution from which they are derived
- Implicit priors favoring common or plausible behaviors
- Optimization objectives that emphasize realism and diversity over adversarial boundary exploration

As a result, generative models tend to reinforce the statistical center of the distribution. Safety violations, by contrast, often reside in low-probability regions — at the tails, along discontinuities, or near adversarial boundaries of the state space.

This is not merely a theoretical concern. Research in falsification-based testing and rare-event analysis has consistently shown that unguided random or learned sampling struggles to discover safety violations unless it is explicitly steered toward unsafe regions. Industrial simulation platforms increasingly recognize this limitation by introducing coverage metrics, constraint-based testing, and robustness measures, rather than relying solely on scenario counts or statistical diversity.

Even the ISO 21448 standard (Safety of the Intended Functionality, SOTIF) explicitly acknowledges that hazardous behavior may arise without system faults, particularly due to performance limitations or unforeseen operational conditions. This perspective implicitly moves beyond enumerated scenarios and toward systematic exploration of unsafe behaviors.

At the core of AI-driven scenario generation lies an implicit assumption: that the learned distribution is sufficiently representative of the space of possible failures. Yet generative models are optimized to reproduce what is plausible and statistically consistent with their training data — not to guarantee coverage of critical unsafe behaviors.

From a safety assurance standpoint, this distinction is decisive. Safety is not concerned with what is likely to happen, but with what must not happen. Rare events, adversarial interactions, and subtle structural combinations often lie outside the support of the learned distribution and may never be generated — regardless of how sophisticated the model becomes.

In short, statistical reconstruction does not imply structural completeness.

## **Safety Is About Boundaries, Not Instances**

The core limitation of scenario-based testing can be summarized succinctly:

> **Scenarios describe instances; safety violations emerge at boundaries.**

From a systems and control perspective, safety properties define constraints over trajectories, not over isolated snapshots. Whether expressed as minimum distance, bounded acceleration, or temporal logic specifications, safety requirements delineate regions of acceptable behavior in a continuous space.

Enumerating scenarios — no matter how many — does not guarantee that these boundaries are adequately explored. AI-driven scenario generation improves this situation by reconstructing scenarios from data distributions, implicitly embedding a measure over the scenario space and sampling from a learned latent representation. In principle, this allows exploration of regions that are more likely according to historical data, providing a structured, distribution-aware alternative to naïve enumeration.

However, this approach remains fundamentally statistical rather than structural. The regions sampled are constrained by the learned distribution and the conditioning signals (prompts, in the case of LLM-driven generation), which influence the latent space but do not guarantee coverage of critical boundaries. As a result, AI-generated scenarios may still miss rare or adversarial behaviors that lie outside the typical data manifold.

This is why many safety-critical domains, including avionics and industrial control, rely on formal methods to complement testing. Formal verification, reachability analysis, and specification-based falsification are not replacements for scenarios; rather, they provide the structural guarantees that neither discrete enumeration nor AI-driven generation alone can offer.

For autonomous driving, the challenge is not generating more scenarios, but **understanding which regions of the system’s behavior space remain untested—and why**.


![Figure1](blogs/20260220/boundary.svg)

> *Fig 1. Scenario-based testing samples isolated points in a continuous state space, while safety violations typically occur near structured boundaries. Increasing the number of scenarios does not guarantee coverage of these critical regions.*

## **How Formal Methods Complement Scenario-Based Testing**

Scenario-based testing answers:

> **“What happens in these situations?”**

Formal methods, by contrast, focus on a deeper question:

> **“What cannot happen, regardless of the situation?”**

This distinction is crucial. Scenario testing and formal methods are not competitors—they are complementary layers in a safety assurance stack. While scenarios explore possibilities, formal methods define boundaries, constraints, and invariants that ensure safety **beyond any individual instance**.

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

In this framework, scenarios are no longer standalone evidence of safety—they are **witnesses**:

* Passing scenarios witness consistency with a safety property.
* Failing scenarios witness the existence of a counterexample.

Each scenario becomes traceable to a formal property, a region of the state space, and a set of assumptions. This traceability is what regulators, safety boards, and engineering teams increasingly require. It turns simulation outputs from isolated data points into **structured evidence** aligned with a defined operational model.

---

### 3.4 From Parameter Spaces to Semantic Spaces

A common misconception is that formal methods must reason over raw continuous parameters—positions, velocities, accelerations, weather, timing offsets—which seems intractable.

The key insight is **semantic abstraction**: scenarios are defined not as raw vectors, but as objects with roles, relations, temporal structure, and context, often expressed in grammars or operational models (e.g., ODD, OpenSCENARIO).

Formal reasoning operates over this **semantic scenario space**, not over every physically possible combination. It ensures completeness, consistency, and coverage **relative to meaningful behaviors**, rather than raw physics.

In other words, formal methods:

* define valid scenario structures
* constrain admissible agent interactions
* provide guarantees at the level of semantic organization

This reframing aligns perfectly with scenario-based testing: the scenarios themselves remain concrete and interpretable, but now they are **anchored in structural safety reasoning**.

---

### 3.5 Strategic Positioning

The most subtle but powerful effect of this perspective is organizational and conceptual:

* Scenarios remain the interface engineers interact with.
* Formal methods operate underneath, defining boundaries and guarantees.
* Safety questions shift from “Did we test enough?” to “Have we consistently and completely described operationally relevant behaviors?”

At this point, formal methods are **normalized as infrastructure**: they are not a tool to debate, but the foundational layer that gives meaning and structure to scenario-based testing.

![Figure2](blogs/20260220/formal.svg)

> Semantic scenario space for autonomous driving: blue points show randomly generated or AI-driven scenarios, while orange points represent formal-method-guided exploration focused on the safety boundary. Black curve denotes the formally defined safety boundary, and the red shaded area highlights regions of potential safety violations. This illustrates how formal methods provide structural guidance to scenario exploration, enabling efficient and targeted coverage of critical behaviors.


## Why Formal Methods Create Commercial Leverage, Not Just Technical Rigor

> Formal methods do not replace AI-driven simulation or scenario generation. They **convert outputs into measurable, defensible, and reusable value**—something AI alone struggles to provide.

---

#### 5.1 From Simulation to Reusable Assets

*Simulation consumes huge computational resources. Without structure, much of this effort produces ephemeral value.*

Formal methods introduce **persistent artifacts**:

* explicit safety specifications
* assumption sets and validity domains
* robustness metrics that can be tracked over time

These artifacts **turn simulation results into reusable assets**:

* across software versions
* across system architectures
* for audits months or years later

This persistence directly **reduces wasted computation** and **lowers the cost of unknown unknowns**, while maintaining alignment with long development cycles.

---

#### 5.2 Structured Exploration and Faster Iteration

Formal specifications act as **coverage coordinates**, guiding both AI-driven and manual scenario exploration. They help teams:

* focus on **high-risk or boundary regions** rather than redundant testing
* identify where marginal simulation adds insight
* iterate quickly without “resetting the narrative” after system updates

In other words, formal methods allow **efficient exploration of the semantic scenario space** while keeping safety narratives stable and defensible.

---

#### 5.3 Certification, Liability, and the Cost of Explanation

As systems approach deployment, **explainability and accountability** dominate costs:

* Regulators ask: *“What safety claims are you making, under which assumptions, and how do you know they hold?”*
* AI-generated scenarios alone do not naturally provide this traceable chain.

Formal methods provide:

* explicit safety claims
* quantitative robustness mapping
* documented assumptions

This **reduces certification costs** and simplifies internal/external review, making simulation results actionable in regulated contexts.

---

#### 5.4 Formal Methods as an Organizational Interface

Beyond tooling, formal methods create a **shared language**:

* engineers reason locally about guarantees
* simulation teams generate targeted evidence
* management tracks risk with concrete metrics

This alignment **scales across teams and organizational layers**, turning technical rigor into a strategic commercial advantage.

---

## Toward Specification-Centered Testing Platforms

Autonomy testing is no longer about generating more scenarios or running more simulations. The emerging differentiator lies in **how safety intent is represented, preserved, and operationalized** across the lifecycle. Specification-centered platforms embody this principle.

---

### From Scenario-Centric to Specification-Centric Thinking

Early testing naturally focused on scenarios: concrete situations, replayable failures, realistic environments. Effective at first, this approach **struggles to scale** as systems and teams grow: scenario sets explode combinatorially, coverage reasoning fragments, and results lose consistency across time.

Specification-centered platforms invert the question:

> “Which properties must always hold, and where are they weakest?”

Scenarios become **means**, not ends. Safety is now defined by properties and boundaries, not by isolated instances.

---

## 6.2 AI as Generator, Formal Methods as Governor

In this framework:

* AI generates diverse scenarios, exploring edge cases and unexpected interactions.
* Formal methods define **what “safe” means**, structure coverage, and constrain interpretation.

Together, they form a feedback loop:

1. specifications define targets
2. AI stresses them through scenario generation
3. robustness metrics highlight gaps

Safety becomes **explicit, measurable, and traceable**—not implicit or assumed.

---

## 6.3 Continuous, Measurable Safety

Specification-centered platforms enable safety as a **tracked signal**:

* robustness trends are monitored over time
* regressions are detected early
* improvements are objectively quantified

This continuity mirrors the evolution of CI/CD in software engineering—applied to safety assurance.

---

## 6.4 Narrowing the Focus: Safety as Specification and Signal

Across domains—autonomous vehicles, robotics, aerospace, algorithmic systems—the recurring lesson is simple but powerful:

> **Safety must be specified and continuously measured, not inferred from scenario counts or isolated tests.**

By anchoring on explicit specifications and robust metrics, platforms transform testing from a collection of experiments into a structured, traceable process. This **narrowed-down focus** unites AI, formal methods, and simulation under a coherent safety framework, providing both **technical rigor and operational leverage**.

---
