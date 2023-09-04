import { ref, onMounted, onUnmounted } from 'vue';

export function useDropdown(dropdownId: string) {
  const dropdownOpen = ref(false);

  const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
  };

  const closeDropdown = (e: Event) => {
    const dropdownElement = document.getElementById(dropdownId);
    if (dropdownElement && !dropdownElement.contains(e.target as Node)) {
      dropdownOpen.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', closeDropdown);
    document.addEventListener('wheel', closeDropdown);
  });

  onUnmounted(() => {
    document.removeEventListener('click', closeDropdown);
    document.removeEventListener('wheel', closeDropdown);
  });

  return {
    dropdownOpen,
    toggleDropdown
  };
}
