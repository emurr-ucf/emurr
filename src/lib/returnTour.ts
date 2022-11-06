import { prisma } from "./prisma";

/**
 * @param {string} id - tour id
 * @param {string} tourAuthorId - user id
 */
export const returnTour = async (id: string, tourAuthorId: string) => {
  return await prisma.tour.findFirst({
    where: {
      id,
      tourAuthorId,
    },
    select: {
      id: true,
      tourTitle: true,
      tourDescription: true,
      tourPages: {
        select: {
          id: true,
          title: true,
          published: true,
        },
      },
    },
  });
};
