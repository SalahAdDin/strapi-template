import type { Schema, Struct } from '@strapi/strapi';

export interface DataSocialNetworkCredentials extends Struct.ComponentSchema {
  collectionName: 'components_data_social_network_credentials';
  info: {
    displayName: 'Social Network Credentials';
    icon: 'twitter';
  };
  attributes: {
    facebook: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    instagram: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    linkedIn: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    twitterCreator: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    twitterCreatorId: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'data.social-network-credentials': DataSocialNetworkCredentials;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
