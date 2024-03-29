import React from "react";
import { Auth0Provider, AppState, User } from "@auth0/auth0-react";

type Props = {
  children: React.ReactNode;
};

function Auth0ProviderWithNavigate({ children }: Props) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUrl) {
    throw new Error("Unable to initialize auth");
  }
  const onRedirectCallBack = (state?: AppState, user?: User) => {
    console.log(user);
    console.log(state);
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUrl,
      }}
      onRedirectCallback={onRedirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithNavigate;
