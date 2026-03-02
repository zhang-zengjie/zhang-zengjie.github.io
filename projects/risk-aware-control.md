This research program establishes a **specification-grounded architecture** for **probabilistic risk-aware control** in safety-critical multi-agent systems. At its core lies an explicit operational definition of risk: **The probability of violating a formal safety specification $\varphi$.** Control synthesis is therefore framed as enforcing quantified guarantees of the form $P(\lnot \varphi) \le \varepsilon$.

This formulation transforms safety from a Boolean constraint into a measurable system-level contract. Controllers are designed to be probabilistically correct-by-design, providing sound—though not necessarily complete—satisfaction guarantees. 

In this program, four architectural dimensions of risk-aware control are explored:

- **Intent Uncertainty**: The intentions of other agents are modeled as structured random variables. Uncertainty is explicitly propagated through the control pipeline to quantify violation probabilities at the specification level.

- **Runtime Specifications**: New constraints may evolve during execution.
The architecture maintains probabilistic guarantees under dynamically introduced specifications, enabling adaptive safety governance.

- **Risk-Aware Multi-Agent Coordination**: Global safety probability is preserved through structured interaction mechanisms, including auction-based coordination.
Risk is managed compositionally rather than centrally enforced.

- **Scalable Specification Decomposition**: Complex specifications are decomposed into phase-based contracts with sound composition rules, improving scalability without sacrificing formal guarantees.

These perspectives are instantiated in **SymAware**, a modular risk-aware control framework designed around explicit interfaces for risk definition, probabilistic computation, and controller integration. The objective of the framework is not merely safer control, but rather a bridge between formal specification reasoning and control-theoretic design under uncertainty at the architectural level. By redefining risk as a quantifiable boundary of acceptable violation probability, safety becomes measurable, compositional, and synthesizable. This perspective enables scalable, system-level safety guarantees in environments where uncertainty and interaction are fundamental rather than exceptional.
