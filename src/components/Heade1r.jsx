import React, { Component } from 'react'
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
export default class Heade1r extends Component {
    state = {
        lng: en,
      };
      
   

    render() {
        const [t,i18n] = {useTranslation()}  
        changeLanguage = (e) => {
          const lng = e.target.value;
          this.setState({ lng: lng }, () => {
            i18next.changeLanguage(lng);
          });
        }

        return (
            <div>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto">T-board</h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <a className="p-2 text-dark" href="">{t("Header.plans_pricing")}</a>
                        <a className="p-2 text-dark" href="">Help</a>
                    </nav>
                    <a className="btn btn-primary"  onClick={this.changeLanguage}>es</a>
                    <a className="btn btn-primary"  onClick={this.changeLanguage}>en</a>
                    <a className="btn btn-outline-primary mx-1" href="http://localhost:8002/register">Sign up</a>
                    <a className="btn btn-outline-primary" href="http://localhost:8002/">Sign in</a>
                </div>
            </div>
        )
    }
}
