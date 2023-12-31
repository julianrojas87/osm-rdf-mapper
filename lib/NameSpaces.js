import * as vocabularies from "@treecg/types";

export const OSM = vocabularies.createUriAndTermNamespace("https://w3id.org/openstreetmap/terms#",
    // Classes
    "Element",
    "Node",
    "Way",
    "Relation",
    "Member",
    // Object Properties
    "hasNodes",
    "hasMembers",
    "hasReference",
    "hasRole",
    "access",
    "barrier",
    "bicycle",
    "construction",
    "crossing",
    "cycleway",
    "footway",
    "highway",
    "motor_vehicle",
    "motorcar",
    "oneway_bicycle",
    "oneway",
    "smoothness",
    "surface",
    "tracktype",
    "vehicle",
    // Datatype Properties
    "hasTag",
    "maxspeed",
    "name",
    // Individuals
    // // Global
    "Yes",
    "No",
    // // Access
    "Agricultural",
    "Customers",
    "Delivery",
    "Designated",
    "Destination",
    "Discouraged",
    "Dismount",
    "Emergency",
    "Employees",
    "Fee",
    "Foot",
    "Forestry",
    "FreeAccess",
    "Military",
    "NoAccess",
    "OfficialAccess",
    "Open",
    "Permissive",
    "Permit",
    "Private",
    "PSV",
    "Public",
    "Request",
    "Residents",
    "Staff",
    "Students",
    "UseSidepath",
    // // Barrier
    "Bar",
    "BarrierBoard",
    "Block",
    "Bollard",
    "BorderControl",
    "BumpGate",
    "BusTrap",
    "CableBarrier",
    "Cattle",
    "CattleGrid",
    "CityGate",
    "Chain",
    "Chicane",
    "ConcreteBlocks",
    "CycleBarrier",
    "DeadHedge",
    "Debris",
    "DirtMound",
    "Ditch",
    "Door",
    "Drawbridge",
    "Entrance",
    "FallenTree",
    "Fence",
    "Flowerpot",
    "FoldablePieSlice",
    "FullHeightTurnstile",
    "Garbage",
    "Gate",
    "GuardRail",
    "Hampshire",
    "HampshireGate",
    "Hedge",
    "HeightDifference",
    "HeightRestrictor",
    "HorseBarrier",
    "HorseJump",
    "HorseStile",
    "JerseyBarrier",
    "JerseyBlocks",
    "Kerb",
    "KissingGate",
    "LiftGate",
    "Log",
    "Logs",
    "LogGate",
    "MotorcycleBarrier",
    "ParkingLock",
    "Partly",
    "Planter",
    "Plants",
    "Portcullis",
    "Rock",
    "Rope",
    "RopeFence",
    "Sandpit",
    "SallyPort",
    "Scrub",
    "SidewaysRollingGate",
    "SlideGate",
    "SlidingBeam",
    "SlidingGate",
    "SolidBar",
    "Spikes",
    "Stile",
    "Stone",
    "SumpBuster",
    "SwingGate",
    "TollBooth",
    "Tractorsluis",
    "Tree",
    "TreeTrunk",
    "TurnGate",
    "Turnstile",
    "Wall",
    "Wedge",
    "WicketGate",
    "WireFence",
    // // Bicycle
    "MTB",
    "Official",
    // // Construction
    "UnderConstruction",
    // // Crossing
    "Controlled",
    "Cycle",
    "Informal",
    "Island",
    "Marked",
    "Pavement",
    "Pedestrian",
    "PedestrianSignals",
    "SensorOperated",
    "TrafficLights",
    "Uncontrolled",
    "Unknown",
    "Unmarked",
    "Zebra",
    // // Cycleway
    "ASL",
    "Lane",
    "Opposite",
    "OppositeLane",
    "OppositeTrack",
    "SharedBusway",
    "Shared",
    "SharedLane",
    "TSB",
    // // Footway
    "Sidewalk",
    // // Highway
    "Abandoned",
    "BridleWay",
    "BusGuideway",
    "BusStop",
    "BusWay",
    "Corridor",
    "Crossing",
    "Cycleway",
    "Disused",
    "Elevator",
    "EmergencyAccessPoint",
    "EmergencyBay",
    "Escape",
    "FootHighway",
    "Forward",
    "HighwayCrossing",
    "GiveWay",
    "LivingStreet",
    "Milestone",
    "MiniRoundabout",
    "Motorway",
    "MotorwayJunction",
    "MotorwayLink",
    "Path",
    "PassingPlace",
    "Planned",
    "Platform",
    "Primary",
    "PrimaryLink",
    "Proposed",
    "Raceway",
    "Razed",
    "Residential",
    "RestArea",
    "Road",
    "Secondary",
    "SecondaryLink",
    "Service",
    "Services",
    "SpeedCamera",
    "SpeedDisplay",
    "Steps",
    "Stop",
    "StreetLamp",
    "Tertiary",
    "TertiaryLink",
    "TollGantry",
    "Track",
    "TrafficMirror",
    "TrafficSignals",
    "Trailhead",
    "Trunk",
    "TrunkLink",
    "TurningCircle",
    "TurningLoop",
    "Unclassified",
    // // MotorVehicle
    "Conditional",
    // // Oneway
    "Bidirectional",
    "InOrder",
    "InReverseOrder",
    // // Role
    "Alternate",
    "Alternative",
    "Approach",
    "Backward",
    "Backward:Platform",
    "Branch",
    "Both",
    "Cable",
    "Connection",
    "Detour",
    "End",
    "Excursion",
    "Finish",
    "First",
    "Fork",
    "Forward",
    "Forward:Platform",
    "From",
    "Goal",
    "Guidepost",
    "Historic",
    "Last",
    "Line",
    "Link",
    "Main",
    "Marker",
    "Other",
    "Part",
    "Pipeline",
    "Plant",
    "Platform",
    "PlatformEntryOnly",
    "PlatformExitOnly",
    "Route",
    "Stage",
    "Start",
    "StartStop",
    "Station",
    "Stop",
    "StopEntryOnly",
    "StopExitOnly",
    "Street",
    "Substation",
    "Terminal",
    "Terminus",
    "To",
    "Transfer",
    "Transition",
    "Via",
    // // Smoothness
    "Excellent",
    "VeryGood",
    "Good",
    "Intermediate",
    "Bad",
    "VeryBad",
    "Horrible",
    "VeryHorrible",
    "Impassable",
    // // Surface
    "ArtificialTurf",
    "Asphalt",
    "Asphalt:Lanes",
    "Bricks",
    "Chipseal",
    "Choker",
    "Clay",
    "Cobblestone",
    "Cobblestone:Flattened",
    "Cobblestone:Lanes",
    "Compacted",
    "Concrete",
    "Concrete:Lanes",
    "Concrete:Pavers",
    "Concrete:Plates",
    "Concrete:Slabs",
    "Concrete:Stones",
    "Dirt",
    "Dolomite",
    "Earth",
    "FineGravel",
    "Grass",
    "GrassPaver",
    "Gravel",
    "GravelTurf",
    "Ground",
    "Lawn",
    "Metal",
    "MetalGrid",
    "Mud",
    "Natural",
    "Paved",
    "PavingBlocks",
    "PavingStones",
    "Pebblestone",
    "Plastic",
    "Rocks",
    "Sand",
    "Sett",
    "Shells",
    "Soil",
    "Steel",
    "SteppingStones",
    "Stones",
    "Tiles",
    "Timber",
    "UnhewnCobblestone",
    "Unpaved",
    "UnpavedRocks",
    "Water",
    "Wood",
    "Woodchips",
    // // Tracktype
    "Grade1",
    "Grade2",
    "Grade3",
    "Grade4",
    "Grade5"
);

export const GSP = vocabularies.createUriAndTermNamespace("http://www.opengis.net/ont/geosparql#",
    "asWKT",
    "wktLiteral"
);

export const WGS = vocabularies.createUriAndTermNamespace("http://www.w3.org/2003/01/geo/wgs84_pos#",
    "lat",
    "long"
);

export * from "@treecg/types";