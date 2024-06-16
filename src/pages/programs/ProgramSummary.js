import React, { useEffect, useState, useRef, createRef } from "react";
import ViewProgram from "./ViewProgram";
import EditProgramSummary from "./EditProgramSummary";
import WorkingProgramSummary from "./WorkingProgramSummary";

export default function ProgramSummary({ programId, viewProgramSummary, setViewProgramSummary }) {

  return (
    <div className="start">
      {viewProgramSummary && <ViewProgram programId={programId} setViewProgramSummary={setViewProgramSummary} />}
      {!viewProgramSummary && <EditProgramSummary programId={programId} setViewProgramSummary={setViewProgramSummary} />}
      {/* {edit && <WorkingProgramSummary edit={edit} setEdit={setEdit} programId={programId} />} */}
    </div>
  );
}
