interface PageableProject {
  title: string;
  description: string;
  gitHubUrl: string | null;
  liveUrl: string | null;
  skills: { name: string }[];
}

export function usePagination(
  projects: PageableProject[],
  currentPage: number,
) {
  const projectsPerPage = 1;
  const totalPages = Math.max(1, Math.ceil(projects.length / projectsPerPage));
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = projectsPerPage * currentPage;
  const visibleProjects = projects.slice(startIndex, endIndex);

  return {
    totalPages,
    visibleProjects,
  };
}
