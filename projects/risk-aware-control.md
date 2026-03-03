This research program establishes a *specification-grounded architecture* for *probabilistic risk-aware control* in safety-critical multi-agent systems. At its core lies an explicit operational definition of risk: **the probability of violating a formal safety specification $\varphi$.** Control synthesis is therefore framed as enforcing quantified guarantees of the form $P(\lnot \varphi) \le \varepsilon$.

This formulation transforms safety from a Boolean constraint into a measurable system-level contract. Controllers are designed to be probabilistically correct-by-design, providing sound—though not necessarily complete—satisfaction guarantees. 

In this program, four architectural dimensions of risk-aware control are explored:

- ***Intent Uncertainty***: The intentions of other agents are modeled as structured random variables. Uncertainty is explicitly propagated through the control pipeline to quantify violation probabilities at the specification level. [<a href="https://arxiv.org/abs/2404.09037" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/pce-intent-aware-control" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>][ <a href="https://youtu.be/Pvaj_e2hlY0?si=6VZd67yJaP3ChGmM" title="Demo Video"><img src="logos/video-svgrepo-com.svg" 
            alt="Demo Video" 
            width="20"
            title="Demo Video"
            style="vertical-align: middle;"></a> ]

- ***Runtime Specifications***: New constraints may evolve during execution.
The architecture maintains probabilistic guarantees under dynamically introduced specifications, enabling adaptive safety governance. [<a href="https://arxiv.org/abs/2402.03165" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/ram-ruts" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>]

- ***Multi-Agent Coordination***: Global safety probability is preserved through structured interaction mechanisms, including auction-based coordination.
Risk is managed compositionally rather than centrally enforced. [<a href="https://arxiv.org/abs/2404.02111" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/tasmas" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>]

- ***Scalable Specification Decomposition***: Complex specifications are decomposed into phase-based contracts with sound composition rules, improving scalability without sacrificing formal guarantees. [<a href="https://arxiv.org/abs/2303.17086" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/modustl" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>]

These perspectives are instantiated in [***SymAware***](https://gitlab.mpi-sws.org/sadegh/eicsymaware) [<a href="https://arxiv.org/abs/2409.14833" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/tasmas-symaware-base" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>][ <a href="https://gitlab.mpi-sws.org/sadegh/eicsymaware" title="Dataset"><img src="logos/data-service-svgrepo-com.svg" 
            alt="Dataset" 
            width="16"
            title="Dataset"
            style="vertical-align: middle;"></a> ], a modular risk-aware control framework designed around explicit interfaces for risk definition, probabilistic computation, and controller integration. The objective of the framework is not merely safer control, but rather a bridge between formal specification reasoning and control-theoretic design under uncertainty at the architectural level. By redefining risk as a quantifiable boundary of acceptable violation probability, safety becomes measurable, compositional, and synthesizable. This perspective enables scalable, system-level safety guarantees in environments where uncertainty and interaction are fundamental rather than exceptional.
