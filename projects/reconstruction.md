This line of work develops a structural framework for reconstructing decision-relevant signals under partial observability. In this framework, uncertainties such as disturbances, interaction forces, and hidden dynamics are modeled as latent structural variables. The objective is to reconstruct residual signals that expose internal system behavior when sensing is severely limited.

The framework organizes reconstruction strategies according to the degree of structural knowledge available about the system.

- ***Known Internal Structure***: When system dynamics are known, observer design provides structured residual reconstruction.
Sliding-mode disturbance observers and hybrid observers are used to recover hidden inputs and interaction forces with robustness guarantees.  [<a href="https://www.researchgate.net/publication/361640460_Disturbance_estimation_for_robotic_systems_using_continuous_integral_sliding_mode_observers" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/smc-for-robot" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>]

- ***Unknown Internal Structure***: When structural knowledge is unavailable, historical data patterns are leveraged. Learning-based estimators combined with Bayesian inference reconstruct latent interaction variables through statistical regularity.  [<a href="https://www.researchgate.net/publication/341956503_An_Online_Robot_Collision_Detection_and_Identification_Scheme_by_Supervised_Learning_and_Bayesian_Decision_Theory" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/robocol-detect" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>][ <a href="https://zenodo.org/records/6461868" title="Dataset"><img src="logos/data-service-svgrepo-com.svg" 
            alt="Dataset" 
            width="16"
            title="Dataset"
            style="vertical-align: middle;"></a> ][ <a href="https://youtu.be/w_9OXqCaE20" title="Demo Video"><img src="logos/video-svgrepo-com.svg" 
            alt="Demo Video" 
            width="20"
            title="Demo Video"
            style="vertical-align: middle;"></a> ]

- ***Partially Known Structure***: When system structure is only partially specified, adaptive observers bridge parametric uncertainty and model incompleteness, enabling online structural refinement.  [<a href="https://www.researchgate.net/publication/373477819_Adaptive_Observer_for_a_Class_of_Systems_with_Switched_Unknown_Parameters_Using_DREM" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>]

Reconstructed signals are not just diagnostic artifacts. They can be used to proactively mitigate structured uncertainty through feedforward compensation. While such compensation does not replace robust suppression during transients, it has been shown to significantly improve steady-state performance. [<a href="https://www.researchgate.net/publication/319362756_Protective_control_for_robot_manipulator_by_sliding_mode_based_disturbance_reconstruction_approach" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][ <a href="https://youtu.be/SOQ6isldjx4" title="Demo Video"><img src="logos/video-svgrepo-com.svg" 
            alt="Demo Video" 
            width="20"
            title="Demo Video"
            style="vertical-align: middle;"></a> ]

Historically, this body of work represents a pre–AI era methodology for signal construction under uncertainty:

- When structure is known → *exploit it*
- When structure is unknown → *infer it statistically*
- When structure is partial → *adaptively refine it*

It establishes a systematic approach to extracting high-quality latent signals from limited sensing, a foundation for both system validation and risk-aware control.
