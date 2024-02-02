export interface PalSaveData {
  CharacterID: string;
  Gender: string;
  Level?: number;
  Exp?: number;
  EquipWaza: string[];
  MasteredWaza: string[];
  HP: number;
  Talent_HP: number;
  Talent_Melee?: number;
  Talent_Shot?: number;
  Talent_Defense?: number;
  FullStomach?: number;
  PassiveSkillList?: string[];
  MP: number;
  OwnedTime: number;
  OwnerPlayerUId: string;
  OldOwnerPlayerUIds: string[];
  MaxHP: number;
  CraftSpeed: number;
  CraftSpeeds: CraftSpeed[];
  EquipItemContainerId: EquipItemContainerId;
  SlotID: SlotId;
  MaxFullStomach?: number;
  GotStatusPointList: GotStatusPointList[];
  LastJumpedLocation?: LastJumpedLocation;
  DecreaseFullStomachRates?: DecreaseFullStomachRates;
  AffectSanityRates?: AffectSanityRates;
  CraftSpeedRates?: CraftSpeedRates;
  SanityValue?: number;
  CurrentWorkSuitability?: string;
  ItemContainerId?: ItemContainerId;
  MaxSP?: number;
  IsRarePal?: boolean;
  BaseCampWorkerEventType?: string;
  BaseCampWorkerEventProgressTime?: number;
}

export interface CraftSpeed {
  WorkSuitability: string;
  Rank: number;
}

export interface EquipItemContainerId {
  ID: string;
}

export interface SlotId {
  ContainerId: ContainerId;
  SlotIndex: number;
}

export interface ContainerId {
  ID: string;
}

export interface GotStatusPointList {
  StatusName: string;
  StatusPoint: number;
}

export interface LastJumpedLocation {
  x: number;
  y: number;
  z: number;
}

export interface DecreaseFullStomachRates {}

export interface AffectSanityRates {}

export interface CraftSpeedRates {}

export interface ItemContainerId {
  ID: string;
}
