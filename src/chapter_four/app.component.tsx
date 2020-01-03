/**
 * Created by Gene on 16/3/14.
 */

import * as React from 'react'
import { Route } from 'react-router';
import AboutComponent from "./about.component";
import HomeComponent from "./home.component";

import NavLink from './navlink.component';
import RepoComponent from "./repo.component";
import ReposComponent from "./repos.component";

class AppComponent extends React.Component<any, any> {

    render() {
        const {  match } = this.props;
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/repos">Repos</NavLink></li>
                </ul>
                <div>
                <Route exact path={`${match.url}`} component={HomeComponent}/>
                <Route path={`${match.url}repos`} component={ReposComponent}/>
                <Route path={`${match.url}repos/:userName/:repoName`} component={RepoComponent}/>
                <Route path={`${match.url}about`} component={AboutComponent}/>
                </div>
            </div>
        )
    }
}

export default AppComponent;
