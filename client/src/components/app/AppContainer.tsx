import React, { useCallback, useState, useEffect, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import classes from "./styles/AppContainer.module.css";
import { AuthContext } from "../../context/AuthContext";
import { Projects } from "./Projects";
import { IAuthInfo, IUserData, IProjects } from "../../interfaces";
import { ThemeContext } from "../../context/ThemeContext";
import { Theme } from "../../context/ThemeContext";
import { CreateProjectButton } from "./CreateProjectButton";

export const AppContainer = () => {
  const request: Function = useHttp();
  const authInfo: IAuthInfo = useContext(AuthContext);
  let [userPersonalProjectsData, setUserPersonalProjectsData]: [Array<IProjects> | undefined, Function] = useState(undefined);
  let [projects, setProjects]: [Array<string>, Function] = useState([]);
  const getUserData = useCallback(async () => {
    try {
      const dataFetched: IUserData = await request("/api/personal/data", "GET", null, {
        Authorization: `Bearer ${authInfo.token}`
      });
      setUserPersonalProjectsData(dataFetched.personalChannel);
    } catch (error) {
      console.log("Error", error);
    }
  }, [authInfo, request])
  useEffect(() => {
    getUserData();
  }, [fetch])
  useEffect(() => {
    if (userPersonalProjectsData !== undefined) {
      userPersonalProjectsData.map(project => setProjects((projects: any) => [...projects, project.projectName]));
    }
  }, [userPersonalProjectsData, setProjects])

  
  const renderingProjects = projects.map(project => <Projects projectName={project} key={projects.indexOf(project)} />);
  return(
    <ThemeContext.Consumer>
      {({theme, changeTheme}) => (
        <div className={theme === Theme.LIGHT ? classes.wrapper : classes.wrapperDark}>
          <div className={classes.channelsWrapper}>
            <div className={classes.default}></div>
          </div>
          <div className={classes.projectsWrapper}>
            <div className={classes.projectsContainer}>
              <div className={classes.projects}>
                <ul>
                  {renderingProjects}
                </ul>
              </div>
              <CreateProjectButton />
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}