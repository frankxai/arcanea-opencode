/**
 * @deprecated Use ./starlight instead. This module re-exports for backward compatibility.
 *
 * Sisyphus has been renamed to Starlight in Arcanea Intelligence OS v4.0.0
 * The Starlight Engine is the Lumina-Nero Orchestration system.
 */

export {
  createStarlightOrchestrator as createSisyphusOrchestrator,
  createStarlightOrchestrator,
  type StarlightOrchestratorConfig as SisyphusOrchestratorConfig,
  type StarlightOrchestratorConfig,
  type ArcaneaGuardianConfig,
  type HybridAgent,
} from "../starlight";
