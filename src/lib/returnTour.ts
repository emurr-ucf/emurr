import { Tour } from "@prisma/client";
import { formatCreatedAt, formatUpdatedAt } from "./formatDate";
import { prisma } from "./prisma";

/**
 * @param {string} id - tour id
 * @param {string} tourAuthorId - user id
 */
export const returnTour = async (id: string, tourAuthorId: string) => {
  const tour: any = await prisma.tour.findFirst({
    where: {
      id,
      tourAuthorId,
    },
    include: {
      tourPages: true,
    },
  });

  tour.tourCreatedAt = formatCreatedAt((tour as Tour).tourCreatedAt);
  tour.tourUpdatedAt = formatUpdatedAt((tour as Tour).tourUpdatedAt);

  return tour;
};
