This line of work studies how AI-driven autonomous systems learn constraint-consistent behavior through the integration of structured priors within reinforcement learning-based planners.

Rather than encoding safety solely via reward penalties, I investigated how explicit structural information as priors can reduce exploration complexity and bias policy search toward constraint-aware schemes. Three types of priors are considered:

- ***Dynamic Movement Primitives (DMP)** as motion templates* [<a href="https://arxiv.org/abs/2304.05703" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>]

- ***Implicit policies** derived from human demonstration data* [<a href="https://arxiv.org/abs/2307.16062" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://zenodo.org/records/11237604" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>][ <a href="https://zenodo.org/records/11237258" title="Dataset"><img src="logos/data-service-svgrepo-com.svg" 
            alt="Dataset" 
            width="16"
            title="Dataset"
            style="vertical-align: middle;"></a> ][ <a href="https://youtu.be/o9tD9N-rEOc" title="Demo Video"><img src="logos/video-svgrepo-com.svg" 
            alt="Demo Video" 
            width="20"
            title="Demo Video"
            style="vertical-align: middle;"></a> ]

- ***Environmental symmetries** as geometric heuristics* [<a href="https://arxiv.org/abs/2304.06055" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>]

Empirical results in robotic obstacle-avoidance tasks demonstrate accelerated convergence and reduced policy variance. More importantly, the study reveals a structural limitation: even with structured priors, learned policies remain stochastic and statistically reliable. They are still difficult to characterize analytically or certify at the trajectory level.

This insight exposes a fundamental gap between learning-driven capability and formally verifiable safety. While priors facilitate the acquisition of safe patterns, they do not by themselves yield quantifiable guarantees. This realization motivated my subsequent work on risk-aware control that persues presevation of probabilistic specification satisfaction, and specification-centered validation frameworks that verifies AI-driven systems with explicit and structured knowledge.
