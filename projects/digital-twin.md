This line of work investigates the feasibility and architectural implications of digital-twin–based validation for AI-enabled autonomy. Rather than treating simulation as a prototyping convenience, this work positions digital twins as validation infrastructure designed to support scalable, repeatable, and specification-driven testing. It asks a structural question: can virtual entities reliably substitute physical systems for specification-centered verification prior to real-world deployment?

Two complementary modeling paradigms were explored to synchronize virtual and physical systems:

- ***Physics-based model*** [<a href="https://www.researchgate.net/publication/361946429_A_High-Fidelity_Simulation_Platform_for_Industrial_Manufacturing_by_Incorporating_Robotic_Dynamics_Into_an_Industrial_Simulation_Tool" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/ciros-digital-twinning" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>][ <a href="https://youtu.be/aTvu2ilaggw?si=YERAEuV-covoRKE7" title="Demo Video"><img src="logos/video-svgrepo-com.svg" 
            alt="Demo Video" 
            width="20"
            title="Demo Video"
            style="vertical-align: middle;"></a> ]


- ***Data-driven model*** [<a href="https://arxiv.org/abs/2507.02313" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/dl-vehicle-model" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>][ <a href="https://zenodo.org/records/12536536" title="Dataset"><img src="logos/data-service-svgrepo-com.svg" 
            alt="Dataset" 
            width="16"
            title="Dataset"
            style="vertical-align: middle;"></a> ][ <a href="https://youtu.be/aTvu2ilaggw" title="Demo Video"><img src="logos/video-svgrepo-com.svg" 
            alt="Demo Video" 
            width="20"
            title="Demo Video"
            style="vertical-align: middle;"></a> ]

Empirical studies in robotic manipulators and mobile platforms demonstrated that data-driven models can achieve superior behavioral fidelity in reproducing hardware dynamics. However, unlike physics-based models, their generalization guarantees remain uncertified, highlighting a trade-off between fidelity and formal assurance. This establishes a key architectural tension in digital-twin validation: ***accuracy*** versus ***provability***.

A digital twin is meaningful only if its state remains aligned with its physical counterpart. Experiments revealed that, in small-scale or single-agent settings, synchronization overhead is negligible. However, in large-scale or multi-agent scenarios, maintaining cross-entity consistency may become a dominant systems challenge. State alignment, timing consistency, and data management are not just implementation details. Instead, they are architectural constraints that determine whether validation results transfer meaningfully to physical deployment.

A broader insight of this work is that digital twins make autonomy validation tractable at scale, but only when treated as a systems architecture rather than a visualization tool. From a layered prospective, virtualization offers scalability, modeling choices determine fidelity, while synchronization governs credibility. When these layers are coherently designed, digital twins become an enabling substrate for specification-centered validation of AI-enabled systems before real-world exposure.
