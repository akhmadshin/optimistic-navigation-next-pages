interface Window {
  pageMounted?: () => void;
  placeholderData?: any;
  pageMountedPromise?: Promise<void>;
}
