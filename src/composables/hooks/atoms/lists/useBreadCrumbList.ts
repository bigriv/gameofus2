import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export const useBreadCrumbList = () => {
  const route = useRoute();

  const getBreadCrumb = () => {
    const breadcrumbs: Array<{ name?: string; path?: string }> = route.matched
      .map((p) => {
        const name = typeof p.meta.title == "string" ? p.meta.title : undefined;
        return {
          name: name,
          path: p.path,
        };
      })
      .filter((p) => p.name);
    console.log(breadcrumbs);
    delete breadcrumbs[breadcrumbs.length - 1].path;
    return breadcrumbs;
  };

  const breadcrumbs = ref(getBreadCrumb());

  watch(
    () => route.path,
    () => {
      console.log(route.path);
      breadcrumbs.value = getBreadCrumb();
    }
  );
  return { breadcrumbs };
};
