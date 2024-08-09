import React, { RefObject, useRef } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';

interface Props {
  faceComponent?: JSX.Element;
  // eslint-disable-next-line no-unused-vars
  onSuccess: (res: unknown) => void;
  // eslint-disable-next-line no-unused-vars
  onError: (err: unknown) => void;
}
export default function ImageKitInput({
  faceComponent,
  onSuccess,
  onError,
}: Props) {
  const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint: string | undefined =
    process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;
  const authenticationEndpoint: URL = process.env
    .REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT as unknown as URL;

  const authenticator = () => {
    return fetch(authenticationEndpoint).then(response => response.json());
  };

  const fileUploadRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  return (
    <>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <IKUpload
          style={{ display: faceComponent ? 'none' : 'inherit' }}
          customCoordinates={'10,10,10,10'}
          isPrivateFile={false}
          useUniqueFileName={true}
          responseFields={['tags']}
          validateFile={file => file.size < 2000000}
          folder={'/sample-folder'}
          webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
          overwriteFile={true}
          overwriteAITags={true}
          overwriteTags={true}
          overwriteCustomMetadata={true}
          onUploadStart={() => {
            // eslint-disable-next-line no-console
            console.log('Upload Started');
          }}
          onError={onError}
          onSuccess={onSuccess}
          ref={fileUploadRef}
        />
      </IKContext>
      {faceComponent && (
        <span
          onClick={() => {
            if (fileUploadRef?.current) fileUploadRef.current.click();
          }}
        >
          {faceComponent}
        </span>
      )}
    </>
  );
}
