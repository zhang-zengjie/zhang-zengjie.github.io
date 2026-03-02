This research program develops a specification-grounded framework for probabilistic risk-aware control in multi-agent systems.

Risk is defined explicitly as the probability of violating formal safety specifications, and controller synthesis is formulated to ensure sound guarantees of the form $P(\text{violate } \varphi) \le \varepsilon$.
The resulting designs are probabilistically correct-by-design, with sound (though not necessarily complete) satisfaction guarantees.

The framework addresses four structural dimensions of safety-critical interaction:

* **Intent Uncertainty** — Modeling other agents’ intentions as structured random variables and propagating uncertainty to quantify violation probability.
* **Runtime Specifications** — Maintaining probabilistic guarantees under dynamically introduced temporal logic constraints.
* **Multi-Agent Coordination** — Preserving global safety probability through auction-based interaction mechanisms.
* **Scalable Specification Decomposition** — Decomposing complex specifications into sound phase-based contracts to improve tractability.

These ideas are integrated into *SymAware*, a modular risk-aware control framework that exposes explicit interfaces for risk definition, computation, and controller integration, enabling principled synthesis across heterogeneous multi-agent settings.

Across these components, the unifying objective is to bridge formal specification reasoning and control-theoretic design under uncertainty, transforming safety from an invariant constraint into a measurable probabilistic boundary.
