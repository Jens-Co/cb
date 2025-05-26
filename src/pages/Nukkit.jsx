import React from "react";
import DownloadComponent from "../components/DownloadComponent";

export default function Nukkit() {
  return (
    <DownloadComponent
      projectName="Nukkit"
      groupId="cn.nukkit"
      artifactId="nukkit"
      ignoredVersions={["2.0.0-SNAPSHOT"]}
    />
  );
}
