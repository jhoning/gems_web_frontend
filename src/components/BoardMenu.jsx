import React from 'react'
import '../css/board_menu.css'
import { useTranslation } from 'react-i18next';
const BoardMenu = ({name1,keys})=> {
  const [t] = useTranslation("global")
  return (
    <div class="card">
    <div class="list-group" id="headingOne">
      <h2 class="mb-0">
        <button  class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target={`#collapse${keys}`} aria-expanded="false" aria-controls="collapseOne">
         {name1}<span class="badge bg-success color-white pill_add ">+</span>
        </button>
      </h2>
    </div>

    <div id={`collapse${keys}`} class="collapse " aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
        <button className="btn btn-primary">{t("Board.nTab")}</button>
       {/*  Some placeholder content for the first accordion panel. This panel is shown by default, thanks to the <code>.show</code> class. */}
      </div>
    </div>
  </div>
  )
}



export default BoardMenu
