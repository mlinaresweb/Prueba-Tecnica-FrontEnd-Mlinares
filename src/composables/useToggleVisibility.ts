import { ref,Ref } from 'vue';

interface ToggleVisibilityInstance {
    isContentVisible: Ref<boolean>;
    toggleContentVisibility: () => void;
  }
  
  const instances: Record<string, ToggleVisibilityInstance> = {};
  
  export function useToggleVisibility(id: string): ToggleVisibilityInstance {
    if (!instances[id]) {
      const isContentVisible = ref(true);
      const toggleContentVisibility = () => {
        isContentVisible.value = !isContentVisible.value;
      };
      instances[id] = { isContentVisible, toggleContentVisibility };
    }
    return instances[id];
  }
  
