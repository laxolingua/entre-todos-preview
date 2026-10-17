var e={mejora:`Mejora`,objecion:`Objeción`,inciso:`Inciso`,evidencia:`Evidencia`},t=e=>{try{return localStorage.getItem(e)}catch{return null}},n=[`Muy en contra`,`En contra`,`Neutral`,`A favor`,`Muy a favor`];function r(e,r){e.innerHTML=`
    <p class="dato-titulo">¿Cuánto apoyas esta propuesta?</p>
    <div class="escala" role="radiogroup" aria-label="Tu nivel de acuerdo con esta propuesta">
      ${n.map((e,t)=>`<button type="button" data-v="${t+1}" role="radio" aria-checked="false" disabled>${e}</button>`).join(``)}
    </div>
    <p class="discreto" data-estado></p>
    <p class="discreto">La valoración se activa cuando el banco se publique con su base de datos. Será anónima y solo se publicarán totales.</p>`;let i=[...e.querySelectorAll(`button[data-v]`)],a=e.querySelector(`.escala`),o=e=>{a.classList.toggle(`elegida`,e>0),i.forEach(t=>{let n=Number(t.dataset.v)===e;t.classList.toggle(`on`,n),t.setAttribute(`aria-checked`,String(n))})};return o(Number(t(`et-val-${r}`))||0),{botones:i,marcar:o,estado:e.querySelector(`[data-estado]`)}}async function i(e){let t=e.dataset.propuesta,{botones:n,marcar:i,estado:a}=r(e,t)}function a(t){return`
    <form class="aporte-form" data-form>
      <label class="dato-titulo" for="aporte-tipo">Tu aporte</label>
      <div class="fila">
        <select id="aporte-tipo" name="tipo" ${t?`disabled`:``}>
          ${Object.entries(e).map(([e,t])=>`<option value="${e}">${t}</option>`).join(``)}
        </select>
      </div>
      <label for="aporte-texto" class="oculto">Texto del aporte</label>
      <textarea id="aporte-texto" name="texto" rows="4" minlength="10" maxlength="2000" required
        placeholder="Dirigido a la propuesta, no a personas. Si aportas una evidencia, incluye el enlace." ${t?`disabled`:``}></textarea>
      <button class="boton primario" type="submit" ${t?`disabled`:``}>Enviar para moderación</button>
      <p class="discreto" data-aviso>${t?`Los aportes se activan cuando el banco se publique con su base de datos.`:``}</p>
    </form>`}async function o(e){e.dataset.propuesta;let t=e.querySelector(`[data-aportes]`);t.innerHTML=a(!0)}function s(){let e=document.getElementById(`valoracion`);e&&i(e);let t=document.getElementById(`aportes`);t&&o(t)}export{s as iniciarParticipacion};