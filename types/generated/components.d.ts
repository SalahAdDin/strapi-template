import type { Struct, Schema } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'data.social-network-credentials': DataSocialNetworkCredentials;
    }
  }
}
