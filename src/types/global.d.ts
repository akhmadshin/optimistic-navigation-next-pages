interface Window {
  pageMounted?: () => void;
  placeholderData?: object;
  pageMountedPromise?: Promise<void>;
}
