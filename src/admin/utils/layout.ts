export const toggleDocumentAttribute = (attribute: string, value: string, remove?: boolean): void => {
  if (document.body) {
    const element = document.getElementsByTagName('html')[0];
    const hasAttribute = element.getAttribute(attribute);
    if (remove && hasAttribute) {
      element.removeAttribute(attribute);
    } else {
      element.setAttribute(attribute, value);
    }
  }
};
