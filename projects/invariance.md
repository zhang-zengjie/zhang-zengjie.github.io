
This line of work engages with the classical set-theoretic formulation of safety in nonlinear control, where safety is defined as *forward invariance of a constraint set under system dynamics*. Controller synthesis is therefore constructed to guarantee that trajectories remain within a certified safe region for all admissible evolutions. This formulation represents the most established deterministic definition of safety:
*a system is safe if its reachable set never exits the prescribed constraint set*.

Two complementary realizations were developed within this paradigm:

- ***Switching-Based Control*** — safety enforced through nominal controllers augmented by boundary switching laws to maintain set invariance in robotic manipulators.  [<a href="https://www.researchgate.net/publication/350911411_Safe_Tracking_Control_of_Euler-Lagrangian_Systems_Based_on_A_Novel_Adaptive_Super-twisting_Algorithm" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/smc-for-robot" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>]

- ***Control Barrier Function (CBF)–Based Filtering*** — continuous optimization-based safety filters embedding invariance conditions directly into control synthesis for UAV swarm coverage. [<a href="https://arxiv.org/abs/2304.05723" title="Publication"><img src="logos/text-document-svgrepo-com.svg" 
            alt="Publication" 
            width="20"
            title="Publication"
            style="vertical-align: middle;"></a>][<a href="https://github.com/zhang-zengjie/csur-coverage-control" title="Implementation"><img src="logos/code-svgrepo-com.svg" 
            alt="Implementation" 
            width="20"
            title="Implementation"
            style="vertical-align: middle;"></a>][ <a href="https://zenodo.org/records/13715399" title="Dataset"><img src="logos/data-service-svgrepo-com.svg" 
            alt="Dataset" 
            width="16"
            title="Dataset"
            style="vertical-align: middle;"></a> ][ <a href="https://youtu.be/XUEx6HEZPAM" title="Demo Video"><img src="logos/video-svgrepo-com.svg" 
            alt="Demo Video" 
            width="20"
            title="Demo Video"
            style="vertical-align: middle;"></a> ]



The latter generalizes the former by internalizing boundary conditions into smooth optimization constraints, eliminating discontinuities while preserving formal invariance guarantees.

Beyond specific implementations, the enduring insight of this work is structural. Even now, invariance-based safety remains the canonical framework for deterministic systems because it provides mathematically closed safety definitions supported by the *forward-invariance guarantees* and the *Lyapunov-based stability certification*. For systems with well-characterized dynamics, it yields safety guarantees that are both globally interpretable and formally verifiable.

While inherently low-level and lacking higher-level abstraction interfaces, this paradigm offers a uniquely transparent theoretical architecture. Even as modern control incorporates probabilistic reasoning and learning-based adaptation, invariance theory continues to serve as a foundational reference point: defining what it means, in precise mathematical terms, for a system to be safe.