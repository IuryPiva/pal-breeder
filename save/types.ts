export interface CharacterSaveParameterMap {
  key_type: string
  value_type: string
  key_struct_type: string
  value_struct_type: string
  id: any
  value: Value[]
  type: string
}

export interface Value {
  key: Key
  value: Value2
}

export interface Key {
  PlayerUId: PlayerUid
  InstanceId: InstanceId
  DebugName: DebugName
}

export interface PlayerUid {
  struct_type: string
  struct_id: string
  id: any
  value: string
  type: string
}

export interface InstanceId {
  struct_type: string
  struct_id: string
  id: any
  value: string
  type: string
}

export interface DebugName {
  id: any
  value: string
  type: string
}

export interface Value2 {
  RawData: RawData
}

export interface RawData {
  array_type: string
  id: any
  value: Value3
  type: string
  custom_type: string
}

export interface Value3 {
  object: Object
  unknown_bytes: number[]
  group_id: string
}

export interface Object {
  SaveParameter: SaveParameter
}

export interface SaveParameter {
  struct_type: string
  struct_id: string
  id: any
  value: Value4
  type: string
}

export interface Value4 {
  Level?: Level
  Exp?: Exp
  NickName?: NickName
  HP: Hp
  FullStomach?: FullStomach
  IsPlayer?: IsPlayer
  MaxHP: MaxHp
  Support?: Support
  CraftSpeed: CraftSpeed
  CraftSpeeds: CraftSpeeds
  ShieldHP?: ShieldHp
  ShieldMaxHP?: ShieldMaxHp
  MaxSP?: MaxSp
  SanityValue?: SanityValue
  GotStatusPointList: GotStatusPointList
  DecreaseFullStomachRates?: DecreaseFullStomachRates
  CraftSpeedRates?: CraftSpeedRates
  LastJumpedLocation?: LastJumpedLocation
  VoiceID?: VoiceId
  CharacterID?: CharacterId
  Gender?: Gender
  EquipWaza?: EquipWaza
  MasteredWaza?: MasteredWaza
  Talent_HP?: TalentHp
  Talent_Melee?: TalentMelee
  Talent_Shot?: TalentShot
  Talent_Defense?: TalentDefense
  PassiveSkillList?: PassiveSkillList
  MP?: Mp
  OwnedTime?: OwnedTime
  OwnerPlayerUId?: OwnerPlayerUid
  OldOwnerPlayerUIds?: OldOwnerPlayerUids
  EquipItemContainerId?: EquipItemContainerId
  SlotID?: SlotId
  MaxFullStomach?: MaxFullStomach
  AffectSanityRates?: AffectSanityRates
  CurrentWorkSuitability?: CurrentWorkSuitability
  ItemContainerId?: ItemContainerId
  IsRarePal?: IsRarePal
  BaseCampWorkerEventType?: BaseCampWorkerEventType
  BaseCampWorkerEventProgressTime?: BaseCampWorkerEventProgressTime
}

export interface Level {
  id: any
  value: number
  type: string
}

export interface Exp {
  id: any
  value: number
  type: string
}

export interface NickName {
  id: any
  value: string
  type: string
}

export interface Hp {
  struct_type: string
  struct_id: string
  id: any
  value: Value5
  type: string
}

export interface Value5 {
  Value: Value6
}

export interface Value6 {
  id: any
  value: number
  type: string
}

export interface FullStomach {
  id: any
  value: number
  type: string
}

export interface IsPlayer {
  value: boolean
  id: any
  type: string
}

export interface MaxHp {
  struct_type: string
  struct_id: string
  id: any
  value: Value7
  type: string
}

export interface Value7 {
  Value: Value8
}

export interface Value8 {
  id: any
  value: number
  type: string
}

export interface Support {
  id: any
  value: number
  type: string
}

export interface CraftSpeed {
  id: any
  value: number
  type: string
}

export interface CraftSpeeds {
  array_type: string
  id: any
  value: Value9
  type: string
}

export interface Value9 {
  prop_name: string
  prop_type: string
  values: Value10[]
  type_name: string
  id: string
}

export interface Value10 {
  WorkSuitability: WorkSuitability
  Rank: Rank
}

export interface WorkSuitability {
  id: any
  value: Value11
  type: string
}

export interface Value11 {
  type: string
  value: string
}

export interface Rank {
  id: any
  value: number
  type: string
}

export interface ShieldHp {
  struct_type: string
  struct_id: string
  id: any
  value: Value12
  type: string
}

export interface Value12 {
  Value: Value13
}

export interface Value13 {
  id: any
  value: number
  type: string
}

export interface ShieldMaxHp {
  struct_type: string
  struct_id: string
  id: any
  value: Value14
  type: string
}

export interface Value14 {
  Value: Value15
}

export interface Value15 {
  id: any
  value: number
  type: string
}

export interface MaxSp {
  struct_type: string
  struct_id: string
  id: any
  value: Value16
  type: string
}

export interface Value16 {
  Value: Value17
}

export interface Value17 {
  id: any
  value: number
  type: string
}

export interface SanityValue {
  id: any
  value: number
  type: string
}

export interface GotStatusPointList {
  array_type: string
  id: any
  value: Value18
  type: string
}

export interface Value18 {
  prop_name: string
  prop_type: string
  values: Value19[]
  type_name: string
  id: string
}

export interface Value19 {
  StatusName: StatusName
  StatusPoint: StatusPoint
}

export interface StatusName {
  id: any
  value: string
  type: string
}

export interface StatusPoint {
  id: any
  value: number
  type: string
}

export interface DecreaseFullStomachRates {
  struct_type: string
  struct_id: string
  id: any
  value: Value20
  type: string
}

export interface Value20 {}

export interface CraftSpeedRates {
  struct_type: string
  struct_id: string
  id: any
  value: Value21
  type: string
}

export interface Value21 {}

export interface LastJumpedLocation {
  struct_type: string
  struct_id: string
  id: any
  value: Value22
  type: string
}

export interface Value22 {
  x: number
  y: number
  z: number
}

export interface VoiceId {
  id: any
  value: number
  type: string
}

export interface CharacterId {
  id: any
  value: string
  type: string
}

export interface Gender {
  id: any
  value: Value23
  type: string
}

export interface Value23 {
  type: string
  value: string
}

export interface EquipWaza {
  array_type: string
  id: any
  value: Value24
  type: string
}

export interface Value24 {
  values: string[]
}

export interface MasteredWaza {
  array_type: string
  id: any
  value: Value25
  type: string
}

export interface Value25 {
  values: string[]
}

export interface TalentHp {
  id: any
  value: number
  type: string
}

export interface TalentMelee {
  id: any
  value: number
  type: string
}

export interface TalentShot {
  id: any
  value: number
  type: string
}

export interface TalentDefense {
  id: any
  value: number
  type: string
}

export interface PassiveSkillList {
  array_type: string
  id: any
  value: Value26
  type: string
}

export interface Value26 {
  values: string[]
}

export interface Mp {
  struct_type: string
  struct_id: string
  id: any
  value: Value27
  type: string
}

export interface Value27 {
  Value: Value28
}

export interface Value28 {
  id: any
  value: number
  type: string
}

export interface OwnedTime {
  struct_type: string
  struct_id: string
  id: any
  value: number
  type: string
}

export interface OwnerPlayerUid {
  struct_type: string
  struct_id: string
  id: any
  value: string
  type: string
}

export interface OldOwnerPlayerUids {
  array_type: string
  id: any
  value: Value29
  type: string
}

export interface Value29 {
  prop_name: string
  prop_type: string
  values: string[]
  type_name: string
  id: string
}

export interface EquipItemContainerId {
  struct_type: string
  struct_id: string
  id: any
  value: Value30
  type: string
}

export interface Value30 {
  ID: Id
}

export interface Id {
  struct_type: string
  struct_id: string
  id: any
  value: string
  type: string
}

export interface SlotId {
  struct_type: string
  struct_id: string
  id: any
  value: Value31
  type: string
}

export interface Value31 {
  ContainerId: ContainerId
  SlotIndex: SlotIndex
}

export interface ContainerId {
  struct_type: string
  struct_id: string
  id: any
  value: Value32
  type: string
}

export interface Value32 {
  ID: Id2
}

export interface Id2 {
  struct_type: string
  struct_id: string
  id: any
  value: string
  type: string
}

export interface SlotIndex {
  id: any
  value: number
  type: string
}

export interface MaxFullStomach {
  id: any
  value: number
  type: string
}

export interface AffectSanityRates {
  struct_type: string
  struct_id: string
  id: any
  value: Value33
  type: string
}

export interface Value33 {}

export interface CurrentWorkSuitability {
  id: any
  value: Value34
  type: string
}

export interface Value34 {
  type: string
  value: string
}

export interface ItemContainerId {
  struct_type: string
  struct_id: string
  id: any
  value: Value35
  type: string
}

export interface Value35 {
  ID: Id3
}

export interface Id3 {
  struct_type: string
  struct_id: string
  id: any
  value: string
  type: string
}

export interface IsRarePal {
  value: boolean
  id: any
  type: string
}

export interface BaseCampWorkerEventType {
  id: any
  value: Value36
  type: string
}

export interface Value36 {
  type: string
  value: string
}

export interface BaseCampWorkerEventProgressTime {
  id: any
  value: number
  type: string
}
