
This line of work engages with the classical set-theoretic formulation of safety in nonlinear control, where safety is defined as *forward invariance of a constraint set under system dynamics*. Controller synthesis is therefore constructed to guarantee that trajectories remain within a certified safe region for all admissible evolutions. This formulation represents the most established deterministic definition of safety:
*a system is safe if its reachable set never exits the prescribed constraint set*.

Two complementary realizations were developed within this paradigm:

- **Switching-Based Boundary Control** — safety enforced through nominal controllers augmented by boundary switching laws to maintain set invariance in robotic manipulators.

- **Control Barrier Function (CBF)–Based Filtering** — continuous optimization-based safety filters embedding invariance conditions directly into control synthesis for UAV swarm coverage.

The latter generalizes the former by internalizing boundary conditions into smooth optimization constraints, eliminating discontinuities while preserving formal invariance guarantees.

Beyond specific implementations, the enduring insight of this work is structural. Even now, invariance-based safety remains the canonical framework for deterministic systems because it provides mathematically closed safety definitions supported by the **complete forward-invariance guarantees** and the **Lyapunov-based stability certification**. For systems with well-characterized dynamics, it yields safety guarantees that are both globally interpretable and formally verifiable.

While inherently low-level and lacking higher-level abstraction interfaces, this paradigm offers a uniquely transparent theoretical architecture. Even as modern control incorporates probabilistic reasoning and learning-based adaptation, invariance theory continues to serve as a foundational reference point: defining what it means, in precise mathematical terms, for a system to be safe.