import React, { useState } from "react";
import s from "./sass/AppContainer.module.sass";
import { IPropsAppContainer } from "../../interfaces";
import { ThemeContext } from "../../context/ThemeContext";
import { Theme } from "../../context/ThemeContext";
import { ProjectsContainer } from "./ProjectsContainer";
import { TodosContainer } from "./TodosContainer";
import { ChannelsContainer } from "./ChannelsContainer";

export const AppContainer = (props: IPropsAppContainer) => {

  const [currentChannel, setCurrentChannel]: [string, Function] = useState("personalChannel");
  const changeCurrentChannel = () => {
    // TODO
  }

  const [currentProject, setCurrentProject]: [string, Function] = useState("");
  const changeCurrentProject = (projectName: string): void => {
    setCurrentProject(projectName);
  }
  
  return(
    <ThemeContext.Consumer>
      {({theme, changeTheme}) => (
        <div className={theme === Theme.LIGHT ? s.wrapper : s.wrapperDark}>
          <ChannelsContainer showSettings={props.showSettings}/>
          <ProjectsContainer changeCurrentProject={changeCurrentProject}/>
          <TodosContainer projectName={currentProject}/>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}