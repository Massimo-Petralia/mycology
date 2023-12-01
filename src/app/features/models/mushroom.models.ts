export interface Taxonomy {
  AA?: string | null;
  species?: string | null;
  gender?: string | null;
  family?: string | null;
  order?: string | null;
  synonymous?: string | null;
}

export interface Morphology {
  cap?: string | null;
  gills?: string | null;
  stalk?: string | null;
  flesh?: string | null;
}

export interface Features {
  habitat?: string | null;
  edibility?: string | null;
  note?: string | null;
}

export interface MicroscopicFeatures {
  spores?: string | null;
  pileipellis?: string | null;
  cystidia?: string | null;
}

export interface Iconography {
  imageURL?: string | null;
  description?: string | null;
  message?: string | null;
}

export interface Mushroom {
  id?: number; 
  taxonomy?: Taxonomy 
  morphology?: Morphology 
  features?: Features
  microscopicFeatures?: MicroscopicFeatures 
  iconography?: Iconography[] |null
  message?: string | null 
  // constructor(){
  //   this.taxonomy = {},
  //   this.morphology = {},
  //   this.features = {},
  //   this.microscopicFeatures = {},
  //   this.iconography = [],
  //   this.message = ''
  // }
}
//const fungo = new Mushroom()

// export interface Mushroom {
//   id?: number | null,
//   taxonomy: Taxonomy ;
//   morphology: Morphology;
//   features: Features;
//   microscopicFeatures: MicroscopicFeatures;
//   iconography: Iconography[];
//   message: string| null | undefined;
// }
