import React from "react";
import PublicationCharts from "./PublicationCharts";

export const PublicationData = ({ data, showAuthor = true }) => {
  if (!data || data.length === 0) return null;
  const publicationInfo = data[0];
  const pInfoF = {
    preferredName: publicationInfo.preferredName,
    articleCount: publicationInfo.articleCount,
    firstPublishedYear: publicationInfo.firstPublishedYear,
    lastPublishedYear: publicationInfo.lastPublishedYear,
    publicationYearDetails: publicationInfo.publicationYears.map((year) => ({
      year: year.name,
      records: year.numRecords,
    })),
    topics: publicationInfo.topics,
  };

  return (
    <div>
      {showAuthor && (
        <h2 className="text-xl font-bold mb-4">
          Author: {pInfoF.preferredName}
        </h2>
      )}
      <PublicationCharts
        publicationData={pInfoF.publicationYearDetails}
        topicsDataU={pInfoF.topics}
      />
    </div>
  );
};
