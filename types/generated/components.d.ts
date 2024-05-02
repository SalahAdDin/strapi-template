import type { Schema, Attribute } from '@strapi/strapi';

export interface DataSocialNetworkCredentials extends Schema.Component {
  collectionName: 'components_data_social_network_credentials';
  info: {
    displayName: 'Social Network Credentials';
    icon: 'twitter';
  };
  attributes: {
    facebook: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    instagram: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    linkedIn: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    twitterCreator: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    twitterCreatorId: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'data.social-network-credentials': DataSocialNetworkCredentials;
    }
  }
}
