export const getClientFromLocalStorage = () => {
    const clientString = localStorage.getItem('client');
    if (!clientString) return null;
    try {
      return JSON.parse(clientString);
    } catch (e) {
      console.error('Error al parsear el cliente del localStorage:', e);
      return null;
    }
  };