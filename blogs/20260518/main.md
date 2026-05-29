> Have you ever been trapped in a situation where following every traffic rule perfectly would almost guarantee that you arrive hopelessly late? 
>
> And in such a situation, would you still insist on obeying every rule absolutely literally — even if slightly bending one of them could make your goal significantly more achievable?

Perhaps when merely imagining such a scenario — or when answering a survey questionnaire — the answer seems simple: *rules matter most*. “Fine, I may arrive a little late. I should have left earlier.”

But reality often feels very different.

In dense urban traffic during rush hour, especially when time truly matters — rushing to the airport, heading to a hospital, or trying not to miss a critical business meeting — the answer suddenly becomes much more subtle.

If you strictly wait for the “perfectly safe” gap, you may seem to remain stuck in the endless traffic flow.
“Fine,” you tell yourself, “I will eventually make it.”

But as you watch vehicle after vehicle around you opportunistically squeezing into tiny openings, inching forward little by little, you begin to realize something uncomfortable, and you cannot help but imagine the worst-case outcome:

> Everyone else will continue making progress while you alone remain trapped by the very rules designed to maintain order.

And once that thought appears, another question inevitably follows:

> Can you really afford to be the only one who follows every rule absolutely literally?

If you genuinely begin asking yourself this question, then you have already stepped into what I would call the **rule–goal dilemma**: the tension between constraints designed to preserve safety and the practical necessity of achieving goals in real-world traffic.

In some sense, this resembles a large-scale version of the [**Prisoner's Dilemma**](https://www.econlib.org/library/Enc/PrisonersDilemma.html) — except that 
- the number of participants is enormous, 
- the rules are layered and context-dependent, and 
- the interactions unfold continuously in real time. 

The result is something far more complex than a classical game-theoretic abstraction.

Instead of analyzing this problem purely through the lens of abstract game theory, this blog explores the dilemma from a more grounded perspective: 

- what this phenomenon actually means in reality, 
- what fundamentally causes it, 
- how it should be described, and 
- whether it is truly unavoidable — or merely appears unavoidable because our current ways of modeling, testing, and reasoning about driving behavior remain incomplete.

Some of these questions, I suspect, are far less straightforward than our intuition initially suggests.


## A Glimpse From the Surface

Rules are designed to guarantee **safety**. They constrain human behavior and provide the necessary backbone for preventing unacceptable outcomes. The design of these rules is intentionally *conservative*, often reflecting worst-case assumptions about human behavior, physical dynamics, and environmental uncertainty.

But conservatism comes with a cost. Once constraints become sufficiently strict, certain tasks begin to break down under real-world conditions. Traffic systems are not expected merely to remain collision-free; they are also expected to remain operational. Vehicles must move, interactions must resolve, and traffic flow must continue progressing within limited time.

And importantly, this is not only about *your* behavior. You may personally choose to wait indefinitely — but you cannot control the decisions of others. In highly interactive traffic, once enough participants begin acting opportunistically, rigid adherence to every constraint can paradoxically place the most conservative driver into an increasingly infeasible position.

The conflict becomes especially visible in dense interactive environments:

* Follow every constraint rigidly, and the system may stall;
* Pursue progress aggressively, and certain constraints begin to bend, sometimes subtly, sometimes explicitly.

Yet in reality, the solution is often neither extreme. Most real-world traffic systems operate somewhere in between. Drivers rarely abandon constraints entirely; instead, they continuously and often implicitly *relax* certain constraints in context-sensitive ways in order to maintain overall flow and coordination.

In some situations, society even formalizes such exceptions explicitly, by setting *priority*. Emergency vehicles such as ambulances, fire trucks, and police vehicles are granted extraordinary operational privileges. Ordinary vehicles must yield, even when they technically possess the right of way. In other words, society intentionally grants a small number of highly regulated actors permission to temporarily prioritize operational urgency over normal traffic constraints. Importantly, however, these privileges are tightly controlled and carefully bounded. Ordinary drivers are generally not allowed to unilaterally decide that their own urgency justifies overriding rules.

For everyday human driving, these tensions are instead resolved through social norms, implicit negotiation, and mutual assumptions about morality, patience, responsibility, and cooperation. Drivers continuously “gamble” on each other’s judgment: yielding here, forcing slightly there, assuming that others will notice, react, and accommodate. In many ways, traffic systems rely on this hidden social layer far more heavily than formal regulations alone would suggest.

But once the driver is no longer a human — once driving decisions are delegated to machines and algorithms — the situation changes fundamentally.

For humans, appropriately relaxing certain constraints under context is often intuitive, tacit, and socially negotiated. For machines, however, this process is far from obvious. This is exactly the world of ADAS and autonomous driving systems (ADS). Machines cannot rely on intuition, tacit social understanding, moral judgment, or informal negotiation. Ambiguities that humans navigate naturally become intractable to interpret by algorithms, difficult to attribute responsibility for, and extremely challenging to audit systematically.

This immediately raises a deeper question:

> Should operational feasibility itself be considered part of the specification and taken seriously?

Once feasibility enters the specification space, the problem is no longer simply about enforcing rules. It becomes a question of how systems should interpret, negotiate, and operationalize constraints under dynamically evolving contextual conditions.



## Beneath the Tip of the Iceberg

Once we step beyond the intuitive surface of the rule–goal dilemma, a much deeper problem begins to emerge:

> What exactly does it mean to “appropriately relax” a rule in a complex traffic system?

At first glance, the answer appears deceptively simple. If rules seem too conservative in certain extreme situations, slightly relaxing them appears sufficient to restore progress.

But this intuition captures only the tip of the iceberg.

In reality, designing a unified, consistent, interpretable, and auditable framework for *when*, *how*, and *to what extent* rules may be relaxed is extraordinarily difficult. The challenge is not merely technical — it is deeply semantic, contextual, and systemic.

Traffic rules are designed to ensure predictable and safe interactions. They are codified in laws, traffic regulations, and safety-oriented engineering standards such as ISO 26262, and are reinforced by higher-level operational assumptions embedded in frameworks like SAE driving automation levels. Under ordinary traffic conditions, these constraints are generally feasible: vehicles can maintain safe distances, yield properly, obey priorities, and still make steady progress.

The problem emerges near the boundaries of normality.

Importantly, traffic laws themselves are not entirely rigid. Most legal systems implicitly acknowledge that extreme or unusual circumstances may require a certain degree of flexibility. Human drivers are often granted limited discretionary judgment in situations that regulations cannot fully anticipate.

However, this flexibility is highly subjective. Different individuals interpret the conditions for “reasonable flexibility” very differently, even when they are trained under identical regulations, educated through the same driving curriculum, and share broadly similar cultural norms.

Also, the situation becomes even more complicated once we consider *context*:

> Even if every traffic participant possessed exactly the same mindset, identical moral standards, comparable personalities, and perfectly consistent interpretations of traffic law, they would still face fundamentally different local situations. 

One driver may be rushing toward an emergency; another may be under no urgency whatsoever. One vehicle may have sufficient visibility and maneuverability to safely exploit a narrow opportunity; another may not. One participant may observe subtle behavioral cues from surrounding vehicles that others cannot perceive.

In other words, the meaning of “reasonable flexibility” is not determined solely by the rules themselves, but by the continuously evolving context surrounding each participant.

This is where the problem begins to resemble a large-scale multi-agent dynamical system.

Even under highly idealized assumptions — homogeneous agents with identical rules, identical training, and identical objectives — complex interactions can still produce radically different equilibrium states. Some traffic configurations naturally converge toward cooperative flow; others drift toward aggressive competition, deadlock, or even livelock-like behaviors, where participants continuously react to each other without meaningful global progress.

These *emergent equilibria* are highly sensitive to perturbations. Small local changes in timing, density, or driver behavior can completely alter the global interaction pattern. As a result, many traffic phenomena that appear “irrational” at the individual level may actually emerge naturally from the collective dynamics of the system itself.

Under such conditions, concepts like **safety margins** and **feasibility limits** become inherently *context-dependent*. A following distance that is perfectly reasonable on a highway may become operationally infeasible in congested city traffic. Human drivers frequently adopt opportunistic or mildly aggressive behaviors not necessarily because they are irrational, but because rigid compliance may otherwise prevent meaningful progress entirely.

The implication is profound: in sufficiently dense and interactive environments, some rules effectively begin to behave like **soft constraints**.

This does *not* mean that safety itself becomes negotiable. Certain constraints must remain absolutely inviolable. But other constraints may tolerate limited, context-sensitive relaxation without fundamentally compromising overall safety objectives.

The real challenge, however, lies in defining this boundary precisely:

* Which constraints can be softened?
* Under what contexts?
* To what extent?
* According to whose interpretation?
* And how can such decisions be represented in ways that machines can consistently interpret, reason about, validate, and audit?

Surprisingly, these questions remain far less explored in public discussion than one might expect.

The deeper we examine the rule–goal dilemma, the clearer it becomes that the real difficulty is not simply “breaking rules” versus “following rules.” The true challenge lies in formally characterizing the hidden contextual structure beneath those decisions — the vast, dynamic space beneath the visible tip of the iceberg.

## SOTIF: A Lens Into the Hidden Structure of the Dilemma

No matter how traffic rules are relaxed in pursuit of operational feasibility, one principle remains unquestionable: **safety itself is not negotiable.**

This is exactly why SOTIF provides such an important lens for examining the problem.

Rather than focusing purely on component failures or functional malfunctions, ISO/PAS 21448 (SOTIF) is concerned with hazards that emerge even when the system behaves exactly as intended. In many ways, the rule–goal dilemma explored earlier sits naturally within this perspective: the difficulty is not necessarily that the system is “broken,” but that real-world interaction dynamics may push otherwise reasonable behavior toward unsafe or operationally infeasible outcomes.

Traditional functional safety frameworks such as ISO 26262 typically assume that the operational problem itself is sufficiently well-defined. The system operates within specified constraints, and safety is evaluated primarily through the absence of collisions, hardware faults, or functional violations. Implicitly, feasibility is often treated as largely guaranteed: 

> *Under reasonable conditions*, and *given sufficient time*, the system is expected to eventually complete its intended maneuvers. 

Extreme situations may certainly exist, but they are usually recognized as relatively rare, bounded, or explicitly enumerable cases.

SOTIF extends this perspective by introducing a more nuanced concern:

> What happens when hazards emerge not because the system fails, but because the operational context itself becomes difficult to characterize?

Dense urban traffic introduces exactly this type of difficulty.

The challenge is not merely environmental complexity in the ordinary sense. The deeper issue is that many traffic situations exist near the boundary between “normal operation” and “contextual exception.” Human drivers constantly navigate these boundaries through subjective interpretation, informal negotiation, and situational flexibility. But once autonomous systems are involved, such ambiguity becomes extraordinarily difficult to formalize consistently.

This is where the *hidden structure* beneath the iceberg begins to reveal itself.

Within a SOTIF perspective, the difficulty is not simply determining whether a particular behavior violates a rule. The harder question is whether the surrounding *context* transforms that behavior into a hazard, a non-hazard, or something in between.

For example:

- A *narrow merge* maneuver may appear dangerously aggressive in one context, yet entirely normal and socially expected in another.
- A *reduced following distance* may represent unacceptable risk under poor visibility, but become operationally necessary in dense stop-and-go traffic.
- *Hesitating indefinitely* at an intersection may technically preserve rule compliance, yet create new forms of operational risk through deadlock, obstruction, or cascading interaction effects.

The meaning of safety itself begins to depend on *contextual variables* that are dynamic, interdependent, and often only partially observable.

Several categories of variables become especially influential here:

1. **Behavioral variables of surrounding agents** — aggressiveness, patience, hesitation, willingness to yield, and implicit negotiation styles of nearby human drivers.

2. **Traffic flow and interaction topology** — local density, temporal spacing, interaction ordering, and how collective traffic patterns evolve over time.

3. **Operational context variables** — visibility, road geometry, weather, vehicle maneuverability, sensor limitations, and local environmental constraints.

4. **Temporal and social pressure variables** — urgency, congestion buildup, accumulated waiting time, and socially expected driving tempo.

5. **Constraint hierarchy variables** — which rules are treated as absolutely inviolable, and which are implicitly tolerated as context-sensitive soft constraints under specific circumstances.

None of these variables operate independently. Their interactions continuously reshape the boundary between safe, unsafe, feasible, and infeasible behavior.

This creates a profound challenge for SOTIF-oriented reasoning.

Under classical interpretations, hazards are often categorized into relatively stable conceptual regions: known safe, known hazardous, unknown hazardous, and so forth. But many dense interactive traffic situations resist stable classification entirely.

The same maneuver may appear:

* safe under one traffic equilibrium, but  hazardous under another,
* socially expected in one region or culture, but unacceptable in another,
* operationally necessary at one moment, but recklessly aggressive seconds later.

In other words, the hazard status itself becomes contingent upon an evolving contextual field rather than a fixed behavioral label.

This is the true crux of the difficulty.

The challenge is not the absence of standards. Nor is it simply a matter of insufficient engineering effort. The deeper difficulty lies in anchoring emergent, context-dependent interaction phenomena within frameworks that ultimately require some degree of definable structure, categorization, and auditability.

Even before such scenarios can ever be reliably solved, optimized, or standardized, they must first become properly identifiable.

That requires **making the hidden contextual variables visible**.

> **Figure 1** illustrates a simple but intuitive example on how contextual variables (e.g., traffic density) affects safety category of scenarios.

<div style="text-align: center;">
<img src="blogs/20260518/context-SOTIF.svg" alt="The Dumb Bell Chart" width="640">
</div>

***Figure 1***: *The "Dumb Bell" Chart — How a contextual variable (traffic density) shapes hazard/nonhazard categorization. The horizontal axis represents the hazard/nonhazard dimension of the SOTIF categorization, while the vertical axis represents different values of a contextual variable — traffic density (normal vs. dense). Each dumbbell illustrates the same type of behavior (scenario) placed in different quadrants under different traffic densities. This highlights that hazard classification is context-dependent: the same behavior can be hazardous in one context and nonhazardous in another. Extension to additional contextual variables (such as intentions, driving styles, interactions, etc) may result in a higher dimensional "Dumb Bell" Chart*.

## Revealing the Contextual Variables Through a Formal Perspective

SOTIF highlights the importance of identifying hazards that emerge beyond simple functional failures. But as the previous discussion suggests, many of the most difficult scenarios are not merely “unknown hazards” in the traditional sense. More fundamentally, they involve **hidden contextual structures** that continuously reshape the boundary between safe, unsafe, feasible, and infeasible behavior.

One possible way to reason systematically about this dilemma is to anchor it within a **formal perspective**: *a framework capable of describing rules, goals, contextual interactions, and their trade-offs in explicit, analyzable terms*.

At a sufficiently abstract level, dense interactive traffic can be viewed as a large-scale dynamical multi-agent system. Multiple agents continuously observe, interpret, negotiate, and react to each other under evolving environmental conditions. The challenge is therefore not merely describing the physical motion of vehicles, but characterizing how interaction semantics emerge from the system itself.

Within such a perspective, we may describe the system using several layers:

* **State Space (S):**
  Observable variables describing the physical configuration of the environment and agents — positions, velocities, accelerations, lane occupancy, signal states, relative distances, and so on. A system trajectory can then be represented as a state sequence:

  $$\tau = \{s_0, s_1, s_2, \dots, s_n\} \in S^n,~\mathrm{where}\,s_i \in S, \, \forall \, i \in \{1,2,\cdots,n\}$$

* **Context Variable Space (C):**
  Hidden or partially observable variables that shape how agents interpret and respond to the state itself. Importantly, context is *not* the variables themselves, but a particular assignment of those variables $c \in C$.

  A context may include:

  * aggressiveness of surrounding drivers,
  * implicit negotiation styles,
  * urgency levels,
  * local traffic conventions,
  * environmental visibility,
  * interaction expectations,
  * and countless other latent interaction factors.

  In this sense, the context space represents the possible ways an identical physical state may acquire radically different semantic meanings.

* **Rules (R):**
  Context-dependent constraints intended to preserve safety and operational legality. Formally, they may be represented as mappings over trajectories:

  $$R : S^n \times C \rightarrow \{0,1\}$$

  where $1$ indicates satisfaction and $0$ indicates violation.

* **Goal / Feasibility Objectives (F):**
  Context-dependent conditions describing whether meaningful operational progress is achieved. Similarly, they may be defined over trajectories:

  $$F : S^n \times C \rightarrow \{0,1\}$$

  Examples include successful lane merging, maintaining traffic flow, completing navigation tasks within acceptable operational conditions, and avoiding indefinite deadlock or stagnation.

A driving policy can then be viewed as a mapping:

$$\pi : S \rightarrow S$$

which generates trajectories through interaction with the environment and other agents.

The problem may therefore be framed as follows:

> For possible context assignments within the context space $C$ , identify policies $\pi$ whose generated trajectories simultaneously satisfy rule-based constraints $R$ and operational feasibility objectives $F$ across sufficiently broad classes of interaction scenarios.

This is exactly where the true difficulty begins.

Interestingly, rules $R$ and feasibility objectives $F$ can be expressed in the same formal mathematical form, suggesting that operational feasibility could naturally be incorporated into the specification itself. In our previous collaborative work ([link](https://arxiv.org/abs/2409.09769)), we elaborated on formulating both rules and feasibility as formal specifications and solving for a balanced policy that respects both via optimization.

More importantly, rules and feasibility objectives are not independent quantities. They are deeply coupled because they depend upon the same contextual structure $C$ . Certain contextual configurations may naturally align both objectives; others may place them into direct tension.

Under some traffic equilibria, strict rule satisfaction may remain perfectly feasible. Under others, identical rules may produce stagnation, deadlock, or socially disruptive behavior. Conversely, preserving operational progress may require temporary deviations from idealized constraints.

This perspective also clarifies the meaning of **soft constraints** more precisely.

Traditionally, rules are treated as binary predicates: satisfied or violated. But in practice, some constraints behave less like absolute logical conditions and more like optimization objectives. Instead of:

$$R(\tau, c) \in \{0,1\},~\tau \in S^n, c \in C, $$

certain rules may effectively become:

$$R(\tau, c) \in [0,1], $$

where higher satisfaction remains preferable, but perfect satisfaction is no longer strictly enforced under every context.

Importantly, this does *not* imply that safety itself becomes negotiable. Rather, it reflects that different constraints occupy different *semantic roles* within the operational hierarchy of the system.

The same rule may therefore behave as:

* a rigid hard constraint under one contextual assignment $c_1 \in C$ ,
* while a temporarily relaxable soft constraint under another $c_2 \in C$ .

This formalization exposes a central limitation of many existing approaches.

Some systems treat all rules as universally hard constraints ( $\forall \, c \in C$ ), often leading to excessive conservatism and operational paralysis. Others rely on heuristic thresholds for relaxing rules, but without explicitly modeling the contextual semantics $C$ underlying those decisions.

This gap becomes especially problematic during verification and validation.

Without formal semantics capable of describing contextual trade-offs, testing methodologies remain fundamentally blind to many dense interactive scenarios where rules and operational goals collide. Conversely, introducing explicit contextual reasoning allows us to:

* characterize how rules and goals interact across different contextual assignments,
* identify which latent variables most strongly influence system behavior,
* and systematically generate semantic coverage-driven test scenarios exploring emergent interaction dynamics.

In this sense, formal specification provides something deeper than mere mathematical rigor. It provides a language for exposing hidden structure.

Rather than burying contextual compromises beneath heuristics or ad hoc engineering choices, the problem becomes representable as a structured semantic space that can be explored, stress-tested, and reasoned about systematically.

At the same time, this perspective also reveals why the problem remains fundamentally difficult. Formalization helps us describe the boundaries of the dilemma more clearly, but it does not eliminate the underlying complexity.

The true bottleneck lies in the contextual variable space itself.

In realistic traffic systems, this space is extraordinarily difficult to characterize tractably because it captures not only dynamic environmental evolution, but also the interaction semantics among multiple agents — how agents interpret, anticipate, negotiate, and react to one another over time.

This observation aligns closely with the SOTIF discussion earlier. The hidden contextual structure is precisely what destabilizes fixed hazard classifications.

In many ways, the contextual variable space $C$ defines the maximum expressive capacity of an agent’s semantic understanding of the environment. If the observable state describes what an agent can *see*, then contextual structure governs how the agent can *understand* what it sees — and to what extent that understanding remains meaningful under interaction.

The distinction between “seeing” and “understanding” turns out to be far more important than it initially appears.

> Figure 2 provides a simplified illustration of how contextual variables can fundamentally reshape the feasible solution space and how a "softened" solution is made.

<div style="text-align: center;">
<img src="blogs/20260518/formal_perspective.svg" alt="SOTIF" width="640">
</div>


***Figure 2:*** *Illustration of a simplified specification space under contextual influence. The objective is to identify a feasible policy $\pi^*$, represented by a trajectory tuple $(s_1, s_2)$ evolving within state spaces $S_1$ and $S_2$ , subject to safety-related rules $R_1$ and $R_2$ (red and purple regions), as well as feasibility objectives $F_1$ and $F_2$ (yellow regions). Importantly, these constraints and objectives are themselves conditioned on hidden contextual variables $c \in \mathcal{C}$ , which are not directly observable within the solution space.*

*The left panel illustrates a context in which strict rule satisfaction remains compatible with feasible operation. The right panel shows how changes in contextual conditions may deform, shrink, or even eliminate the feasible solution domain. In such situations, a feasible policy may still exist if certain lower-priority constraints (purple) are temporarily relaxed and treated as soft constraints.*

## Beneath the Iceberg: The Challenge of Contextual Semantics

Identifying the existence of a contextual space is only the beginning.

The deeper challenge lies in something far more difficult: understanding the *hidden semantic structure* embedded within that space — the latent interaction patterns, interpretations, expectations, and contextual meanings that ultimately determine how traffic systems behave in reality.

This is exactly where the problem becomes extraordinarily difficult to formalize, validate, and reason about systematically.

Several intertwined factors contribute to this difficulty.

### 1. Context Is Only Partially Observable

Many of the variables shaping interaction semantics are fundamentally hidden or only indirectly inferable.

A vehicle may observe positions, velocities, lane geometry, and traffic signals, yet still fail to understand the *meaning* of a situation. A narrow gap in traffic may appear physically feasible, while subtle cues embedded in surrounding driver behavior — hesitation, assertiveness, eye contact, local negotiation patterns, accumulated impatience — may completely change its semantic interpretation.

This distinction between observing a state and understanding its contextual meaning is critical.

In practice, traffic interaction often depends less on explicitly visible quantities than on latent assumptions about how other agents are likely to interpret and respond to unfolding situations.

And these assumptions are rarely fully observable.

### 2. Interaction Semantics Are Dynamically Emergent

Feasibility is not a static property attached to an isolated maneuver. It emerges dynamically through continuous interaction among multiple agents.

A maneuver that appears perfectly feasible at one instant may become socially or operationally infeasible milliseconds later as surrounding agents adapt, react, negotiate, or compete.

This creates a highly nonlinear interaction process where semantics themselves continuously evolve.

In many ways, dense traffic behaves less like a collection of independent vehicles and more like a coupled dynamical system whose global behavior emerges collectively. Even under relatively homogeneous assumptions, the system may drift toward very different interaction equilibria: cooperative flow, competitive negotiation, deadlock, oscillatory hesitation, or livelock-like behaviors where agents continuously react without making meaningful progress.

And critically, these equilibria are highly sensitive to contextual perturbations. Small changes in timing, density, or local interpretation may completely reshape the global interaction pattern.

### 3. Constraint Hierarchies Are Semantically Contextual

Not all constraints carry the same semantic role.

Some constraints — collision avoidance, maintaining controllability, avoiding catastrophic hazards — must remain absolutely inviolable. Others behave more like socially negotiated operational conventions whose interpretation depends heavily on context.

But determining which constraints belong to which category is itself deeply difficult.

The challenge is not merely legal or technical; it is semantic. The same physical behavior may carry entirely different meanings under different contexts. A short following distance may represent recklessness in one situation and socially expected traffic participation in another. A hesitant merge may appear cautious in isolation but become disruptive or even hazardous within a dense interaction flow.

This means that constraint hierarchies themselves are not fully context-free. Their operational meaning emerges through interaction.

### 4. The Context Space Is Combinatorially Explosive

Traditional specifications implicitly assume that the operational domain can eventually be enumerated, partitioned, or sufficiently bounded.

But once contextual semantics become central, this assumption rapidly breaks down.

The contextual space is not merely large because there are many environmental states. It becomes intractable because the space also encodes possible interaction modes among agents — how agents interpret each other, adapt to each other, negotiate implicitly, and reshape each other’s future behavior over time.

This dramatically expands the semantic dimensionality of the problem.

The result is a combinatorial explosion not only of physical states, but of possible meanings attached to those states.

And this makes exhaustive validation fundamentally unattainable.

### 5. Conservatism and Progress Become Structurally Coupled

Perhaps most importantly, conservatism and operational progress are not independent objectives that can simply be tuned separately.

Excessive conservatism may itself reshape the surrounding contextual dynamics, encouraging more aggressive behaviors from nearby human drivers, creating new deadlocks, or destabilizing interaction equilibria. Conversely, overly aggressive optimization for progress may erode safety margins and amplify systemic risk.

The trade-off therefore becomes endogenous to the system itself: the behavior of the vehicle changes the contextual field, which in turn reshapes the meaning and feasibility of future actions. This recursive coupling is one of the deepest reasons why the problem resists static treatment.

This leads to an important conclusion:

> Even if these dilemmas cannot be fully resolved — and perhaps they fundamentally cannot — testing and validation must at minimum make them visible.

The goal is not to claim perfect foresight over dense human interaction. Such a goal is unrealistic. Instead, the objective should be to systematically expose the hidden contextual structures under which operational compromises emerge, so that these situations become observable, analyzable, and discussable rather than silently buried inside heuristics or deployment assumptions.

Formal methods can help here — not because they magically solve the problem, but because they provide a language for describing contextual structure explicitly.

They allow us to:

* represent interaction assumptions more transparently,
* characterize where constraints and operational goals begin to collide,
* expose which contextual variables dominate behavior, and
* construct testing scenarios that systematically stress semantic interaction boundaries.

In this sense, the challenge is ultimately not merely technological, but epistemological.

The true difficulty lies in defining, exposing, and reasoning about the semantic limits of safe operation inside partially observable, dynamically interactive environments whose meanings continuously evolve through interaction itself.


## Beyond Rules: Toward Context-Aware Safety


The tension explored throughout this discussion is not merely a *corner case* of autonomous driving. It reflects something much deeper about real-world safety itself.

Traffic rules are indispensable. They provide the structural backbone that makes large-scale coordination among strangers possible. Without them, traffic systems would collapse into chaos. Yet, as we have seen, rigid rule compliance alone does not fully determine whether a system behaves safely, reasonably, or even operationally feasibly inside dense interactive environments.

The deeper reality is more subtle.

In practice, safety emerges not only from explicit constraints, but also from how agents interpret, negotiate, and adapt to contextual situations over time. Many operational compromises arise not because safety is intentionally abandoned, but because static rules encounter dynamic interaction structures that they were never fully designed to encode exhaustively.

This brings us back to the central question raised at the beginning:

> Should operational feasibility itself become part of the specification?

The answer is unlikely to be binary.

Some constraints must remain absolutely inviolable. Collision avoidance, maintaining controllability, and preventing catastrophic hazards cannot become negotiable optimization objectives. But other operational constraints may behave differently under different contextual structures. Their meaning, importance, and acceptable flexibility may depend heavily on interaction semantics that evolve dynamically in real traffic systems.

This is exactly why standards such as ISO 26262 and ISO/PAS 21448 (SOTIF) remain so important. They provide the conceptual and engineering foundations necessary for reasoning about safety systematically. Yet the discussions throughout this article suggest that many of the hardest real-world situations do not fit cleanly into static hazard categories or simple edge-case taxonomies.

Instead, they emerge from hidden contextual structures. From this perspective, the challenge is no longer simply about “rule compliance,” but about identifying and reasoning about contextual semantics — the hidden structures that ultimately shape how safety emerges in real traffic systems. Rendering these structures visible is a critical step toward truly context-aware safety.

This is where formal reasoning can play a meaningful role — not as a magical solution engine, but as a language for exposing structure. Formal specification, semantic modeling, and scenario abstraction help transform implicit assumptions into representations that are transparent, explainable, and systematically testable.

Perhaps more importantly, they allow testing and validation to evolve beyond purely collision-oriented evaluation. Even if some contextual dilemmas ultimately prove impossible to fully eliminate, they must at minimum become visible during verification and validation. In this sense, semantic-aware verification and validation may become one of the most important foundations for achieving genuinely context-aware safety in autonomous driving systems.
