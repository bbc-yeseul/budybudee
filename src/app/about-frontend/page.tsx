'use client'

import { useState } from 'react'
import Link from 'next/link'

const PAGE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+KR:wght@400;500;700&display=swap');
:root{
  --bg:#0E0E10;--bg2:#16161A;--bg3:#1E1E24;--bg4:#252530;
  --b:rgba(255,255,255,0.07);--b2:rgba(255,255,255,0.13);
  --t:#E8E8F0;--t2:#A0A0AD;--t3:#8e8e9c;
  --ac:#5B9EF7;--acd:rgba(91,158,247,0.12);
  --gn:#4EC9A0;--gnd:rgba(78,201,160,0.12);
  --am:#F0A050;--amd:rgba(240,160,80,0.12);
  --co:#F07070;--cod:rgba(240,112,112,0.12);
  --pu:#A07EF0;--pud:rgba(160,126,240,0.12);
  --mono:'JetBrains Mono',monospace;
  --sans:'Noto Sans KR',sans-serif;
  --r:12px;--rs:7px;
}
.fe-intro{background:var(--bg);color:var(--t);font-family:var(--sans);font-size:17px;line-height:1.7;min-height:100vh}
.fe-intro::-webkit-scrollbar{width:5px}
.fe-intro::-webkit-scrollbar-track{background:var(--bg)}
.fe-intro::-webkit-scrollbar-thumb{background:var(--bg4);border-radius:3px}
.fe-intro nav{position:sticky;top:0;z-index:100;background:rgba(14,14,16,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--b);height:52px;padding:0 2rem;display:flex;align-items:center;gap:1.5rem}
.nav-logo{font-family:var(--mono);font-size:15px;font-weight:700;color:var(--ac);display:flex;align-items:center;gap:8px}
.nav-dot{width:8px;height:8px;border-radius:50%;background:var(--ac);animation:fe-pulse 2s infinite}
@keyframes fe-pulse{0%,100%{opacity:1}50%{opacity:.3}}
.nav-links{display:flex;gap:2px;margin-left:auto;list-style:none;flex-wrap:wrap}
.nav-links a{font-size:14px;color:var(--t3);text-decoration:none;padding:5px 9px;border-radius:var(--rs);transition:all .15s}
.nav-links a:hover{color:var(--t);background:var(--bg3)}
.fe-sec{max-width:900px;margin:0 auto;padding:4rem 2rem;border-top:1px solid var(--b)}
.fe-hero{max-width:900px;margin:0 auto;padding:4.5rem 2rem 3.5rem;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
.hero-eye{font-family:var(--mono);font-size:14px;color:var(--ac);letter-spacing:.1em;margin-bottom:1.25rem;opacity:.8}
.hero-title{font-size:clamp(28px,4.5vw,46px);font-weight:700;line-height:1.12;letter-spacing:-.025em;margin-bottom:1.25rem}
.hero-title em{font-style:normal;color:var(--ac)}
.hero-desc{font-size:16px;color:var(--t2);line-height:1.8;margin-bottom:1.5rem}
.hero-tags{display:flex;flex-wrap:wrap;gap:6px}
.htag{font-family:var(--mono);font-size:13px;padding:3px 9px;border-radius:999px;border:1px solid var(--b2);color:var(--t3)}
.fe-illust{width:100%;display:flex;justify-content:center;align-items:center}
.fe-illust-wide{width:100%;margin:1.5rem 0}
.illust-side{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:center}
.ey{font-family:var(--mono);font-size:13px;color:var(--t3);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.6rem}
.stitle{font-size:24px;font-weight:700;margin-bottom:.5rem;letter-spacing:-.01em}
.sdesc{font-size:16px;color:var(--t2);margin-bottom:2rem;line-height:1.75;max-width:600px}
.role-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}
.role-card{background:var(--bg2);border:1px solid var(--b);border-radius:var(--r);padding:1.25rem;transition:border-color .2s}
.role-card:hover{border-color:var(--b2)}
.role-title{font-weight:700;font-size:16px;margin:10px 0 4px}
.role-desc{font-size:14px;color:var(--t2);line-height:1.6}
.diff-wrap{border:1px solid var(--b);border-radius:var(--r);overflow:hidden}
.diff-h{display:grid;grid-template-columns:1fr 1fr}
.dh{padding:10px 16px;font-family:var(--mono);font-size:14px;font-weight:700;border-bottom:1px solid var(--b);display:flex;align-items:center;gap:8px}
.dh.pub{background:var(--amd);color:var(--am);border-right:1px solid var(--b)}
.dh.fe{background:var(--acd);color:var(--ac)}
.diff-b{display:grid;grid-template-columns:1fr 1fr}
.dc{padding:12px 16px;font-size:15px;line-height:1.6;border-bottom:1px solid var(--b)}
.dc:nth-child(odd){border-right:1px solid var(--b);background:rgba(240,160,80,.025)}
.dc:nth-child(even){background:rgba(91,158,247,.025)}
.dc:nth-last-child(-n+2){border-bottom:none}
.dc strong{display:block;font-size:15px;font-weight:700;margin-bottom:3px}
.dc:nth-child(odd) strong{color:var(--am)}
.dc:nth-child(even) strong{color:var(--ac)}
.dc span{color:var(--t2);font-size:14px}
.flow-wrap{overflow-x:auto;padding-bottom:.5rem}
.flow{display:flex;align-items:flex-start;gap:6px;min-width:600px}
.fs{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center}
.fiw{width:44px;height:44px;border-radius:50%;border:1px solid var(--b2);background:var(--bg2);display:flex;align-items:center;justify-content:center;margin-bottom:10px}
.fc{background:var(--bg2);border:1px solid var(--b);border-radius:var(--rs);padding:10px;width:100%}
.frole{font-family:var(--mono);font-size:12px;color:var(--t3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:2px}
.fname{font-size:14px;font-weight:700;margin-bottom:2px}
.fdesc{font-size:13px;color:var(--t2);line-height:1.4}
.fe-step .fiw{border-color:var(--ac);background:var(--acd)}
.fe-step .fname{color:var(--ac)}
.farr{color:var(--t3);margin-top:16px;flex-shrink:0;font-size:16px}
.sgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(0px,1fr));gap:12px}
.scard{background:var(--bg2);border:1px solid var(--b);border-radius:var(--r);padding:1.25rem}
.scat{font-family:var(--mono);font-size:12px;color:var(--t3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px}
.sbadges{display:flex;flex-wrap:wrap;gap:6px}
.badge{font-family:var(--mono);font-size:13px;padding:4px 10px;border-radius:var(--rs);border:1px solid}
.bb{background:var(--acd);color:var(--ac);border-color:rgba(91,158,247,.2)}
.bg2c{background:var(--gnd);color:var(--gn);border-color:rgba(78,201,160,.2)}
.ba{background:var(--amd);color:var(--am);border-color:rgba(240,160,80,.2)}
.bp{background:var(--pud);color:var(--pu);border-color:rgba(160,126,240,.2)}
.bgr{background:var(--bg3);color:var(--t2);border-color:var(--b2)}
.faq-list{display:flex;flex-direction:column;gap:3px}
.fi{background:var(--bg2);border:1px solid var(--b);border-radius:var(--rs);overflow:hidden}
.fq{display:flex;align-items:flex-start;gap:12px;padding:13px 16px;cursor:pointer;user-select:none;transition:background .15s}
.fq:hover{background:var(--bg3)}
.fqm{font-family:var(--mono);font-size:15px;font-weight:700;color:var(--co);flex-shrink:0}
.fqt{font-size:16px;color:var(--t);flex:1;line-height:1.5}
.fch{color:var(--t3);transition:transform .2s;margin-left:auto;flex-shrink:0;font-size:16px}
.fch.open{transform:rotate(180deg)}
.fa{padding:0 16px 13px 44px;font-size:15px;color:var(--t2);line-height:1.7;display:none}
.fa.vis{display:block}
.gcat{font-size:15px;color:var(--t2);font-weight:700;display:flex;align-items:center;gap:8px;margin:1.5rem 0 8px}
.glist{display:flex;flex-direction:column;gap:3px}
.ti{background:var(--bg2);border:1px solid var(--b);border-radius:var(--rs);overflow:hidden}
.th{display:flex;align-items:center;gap:12px;padding:11px 16px;cursor:pointer;user-select:none;transition:background .15s}
.th:hover{background:var(--bg3)}
.tk{font-family:var(--mono);font-size:14px;font-weight:700;color:var(--ac);min-width:110px}
.ts2{font-size:15px;color:var(--t);flex:1}
.tch{color:var(--t3);transition:transform .2s;font-size:16px}
.tch.open{transform:rotate(180deg)}
.tb{padding:16px 16px 13px 138px;font-size:15px;color:var(--t2);line-height:1.7;display:none}
.tb.vis{display:block}
.tcode{margin-top:9px;background:#0A0A0C;border:1px solid var(--b);border-radius:var(--rs);padding:10px 14px;font-family:var(--mono);font-size:14px;color:var(--ac);white-space:pre;overflow-x:auto;line-height:1.7}
.dglabel{font-size:15px;font-weight:700;display:flex;align-items:center;gap:7px;margin-bottom:10px}
.dglabel.good{color:var(--gn)}.dglabel.bad{color:var(--co)}
.dgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-bottom:1.5rem}
.dcard{background:var(--bg2);border:1px solid var(--b);border-radius:var(--r);padding:1rem}
.dcard.good{border-left:2px solid var(--gn)}.dcard.bad{border-left:2px solid var(--co)}
.dtop{display:flex;align-items:flex-start;gap:8px;margin-bottom:7px}
.dico{width:25px;height:25px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px}
.dico.g{background:var(--gnd);color:var(--gn)}.dico.b{background:var(--cod);color:var(--co)}
.dtit{font-size:14px;font-weight:700;color:var(--t);line-height:1.4}
.ddesc{font-size:13px;color:var(--t2);line-height:1.65;margin-bottom:7px}
.dtag{font-family:var(--mono);font-size:12px;padding:2px 8px;border-radius:999px;display:inline-block}
.dtag.g{background:var(--gnd);color:var(--gn);border:1px solid rgba(78,201,160,.2)}
.dtag.b{background:var(--cod);color:var(--co);border:1px solid rgba(240,112,112,.2)}
.cgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.cc2{background:var(--bg2);border:1px solid var(--b);border-radius:var(--r);padding:1.25rem}
.cch{display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem}
.crole{font-family:var(--mono);font-size:13px;font-weight:700;padding:4px 10px;border-radius:999px}
.rpm{background:var(--amd);color:var(--am);border:1px solid rgba(240,160,80,.2)}
.rds{background:var(--pud);color:var(--pu);border:1px solid rgba(160,126,240,.2)}
.rpb{background:var(--gnd);color:var(--gn);border:1px solid rgba(78,201,160,.2)}
.rbe{background:var(--cod);color:var(--co);border:1px solid rgba(240,112,112,.2)}
.ctips{list-style:none;display:flex;flex-direction:column;gap:7px}
.ctips li{font-size:13px;color:var(--t2);line-height:1.55;display:flex;gap:7px}
.tm{color:var(--ac);flex-shrink:0}
.fe-note{margin-top:1.25rem;background:var(--acd);border:1px solid rgba(91,158,247,.15);border-radius:var(--r);padding:1rem 1.25rem;font-size:15px;color:var(--t2);line-height:1.7;display:flex;gap:10px;align-items:flex-start}
.qa-center{background:var(--bg2);border:1px solid var(--b);border-radius:var(--r);padding:3rem 2rem;display:flex;flex-direction:column;align-items:center;gap:12px}
.qa-av{width:90px;height:90px;border-radius:50%;background:var(--acd);border:2px solid rgba(91,158,247,.3);display:flex;align-items:center;justify-content:center}
.qa-name{font-size:17px;font-weight:700}
.qa-status{font-family:var(--mono);font-size:14px;color:var(--t3);display:flex;align-items:center;gap:6px}
.qa-sdot{width:7px;height:7px;border-radius:50%;background:var(--gn);display:inline-block;animation:fe-pulse 1.5s infinite}
.demo-wrap{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.demo-input,.demo-output{background:var(--bg2);border:1px solid var(--b);border-radius:var(--r);overflow:hidden}
.demo-bar{background:var(--bg3);padding:9px 14px;border-bottom:1px solid var(--b);font-size:14px;color:var(--t2)}
.demo-fields{padding:1.25rem;display:flex;flex-direction:column;gap:10px}
.demo-field label{font-size:14px;color:var(--t2);display:block;margin-bottom:4px}
.demo-field input,.demo-field select{width:100%;background:var(--bg3);border:1px solid var(--b2);border-radius:var(--rs);padding:8px 11px;color:var(--t);font-size:15px;outline:none;transition:border-color .15s;font-family:var(--sans)}
.demo-field input:focus,.demo-field select:focus{border-color:var(--ac)}
.demo-field select option{background:var(--bg3)}
.demo-btn{width:100%;padding:10px;background:var(--ac);color:#fff;border:none;border-radius:var(--rs);font-size:15px;font-weight:700;cursor:pointer;font-family:var(--sans);transition:opacity .15s}
.demo-btn:hover{opacity:.85}
.demo-json{padding:1.25rem;font-family:var(--mono);font-size:14px;line-height:1.85;min-height:180px;white-space:pre-wrap}
.demo-empty{color:var(--t3);font-size:14px;font-style:italic}
.perf-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:1.25rem}
.perf-card{background:var(--bg2);border:1px solid var(--b);border-radius:var(--r);padding:1.25rem}
.perf-card.core{border-top:2px solid var(--gn)}
.perf-badge{font-family:var(--mono);font-size:11px;color:var(--gn);letter-spacing:.1em;margin-bottom:.75rem}
.perf-metric{font-family:var(--mono);font-size:28px;font-weight:700;color:var(--ac);line-height:1;margin-bottom:2px}
.perf-unit{font-size:13px;color:var(--t3);margin-bottom:.75rem}
.perf-desc{font-size:14px;color:var(--t2);line-height:1.6;margin-bottom:.875rem}
.perf-thr{display:flex;gap:4px;margin-bottom:.875rem}
.pt{flex:1;padding:5px 4px;border-radius:4px;font-family:var(--mono);font-size:11px;text-align:center;line-height:1.4}
.pt.g{background:var(--gnd);color:var(--gn);border:1px solid rgba(78,201,160,.2)}
.pt.y{background:var(--amd);color:var(--am);border:1px solid rgba(240,160,80,.2)}
.pt.r{background:var(--cod);color:var(--co);border:1px solid rgba(240,112,112,.2)}
.perf-tip{font-size:13px;color:var(--t3);border-top:1px solid var(--b);padding-top:.75rem;line-height:1.5}
.perf-also{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1.25rem}
.perf-mini{background:var(--bg2);border:1px solid var(--b);border-radius:var(--rs);padding:1rem}
.pm-name{font-family:var(--mono);font-size:16px;font-weight:700;color:var(--ac);margin-bottom:2px}
.pm-full{font-size:12px;color:var(--t3);margin-bottom:.5rem}
.pm-desc{font-size:13px;color:var(--t2);line-height:1.55}
.fe-intro footer{border-top:1px solid var(--b);text-align:center;padding:2.5rem;font-family:var(--mono);font-size:14px;color:var(--t3)}
@media(max-width:700px){
  .fe-hero{grid-template-columns:1fr;gap:2rem;padding:3rem 1.25rem}
  .fe-sec{padding:3rem 1.25rem}
  .fe-intro nav{padding:0 1rem}
  .nav-links a{padding:4px 6px;font-size:13px}
  .illust-side{grid-template-columns:1fr}
  .diff-h,.diff-b{grid-template-columns:1fr}
  .dh.pub{border-right:none}
  .dc:nth-child(odd){border-right:none}
  .tb{padding-left:16px}
  .fa{padding-left:16px}
}
`

const HERO_SVG = `<svg width="340" height="260" viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="30" width="90" height="120" rx="8" fill="#1E1E24" stroke="#F0A050" stroke-width="1.5"/>
  <rect x="18" y="42" width="70" height="10" rx="3" fill="#F0A050" opacity=".4"/>
  <rect x="18" y="58" width="50" height="6" rx="2" fill="#686878"/>
  <rect x="18" y="70" width="60" height="6" rx="2" fill="#686878"/>
  <rect x="18" y="86" width="70" height="28" rx="5" fill="#252530" stroke="#F0A050" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="53" y="111" font-size="11" fill="#F0A050" text-anchor="middle" font-family="monospace">Figma</text>
  <rect x="18" y="122" width="30" height="16" rx="4" fill="#F0A050" opacity=".7"/>
  <rect x="54" y="122" width="30" height="16" rx="4" fill="#252530" stroke="#686878" stroke-width="1"/>
  <text x="8" y="174" font-size="12" fill="#F0A050" font-family="monospace">디자인 시안</text>
  <path d="M102 90 L124 90" stroke="#5B9EF7" stroke-width="1.5" stroke-dasharray="4 2"/>
  <path d="M120 85 L128 90 L120 95" stroke="#5B9EF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="130" y="20" width="80" height="140" rx="8" fill="#16161A" stroke="#5B9EF7" stroke-width="1.5"/>
  <rect x="130" y="20" width="80" height="22" rx="8" fill="#1E1E24"/>
  <rect x="130" y="34" width="80" height="8" fill="#1E1E24"/>
  <circle cx="141" cy="31" r="5.5" fill="#FF5F57"/>
  <circle cx="152" cy="31" r="5.5" fill="#FEBC2E"/>
  <circle cx="163" cy="31" r="5.5" fill="#28C840"/>
  <text x="180" y="40" font-size="9" fill="#686878" text-anchor="middle" font-family="monospace">App.jsx</text>
  <text x="140" y="62" font-size="9.5" fill="#A07EF0" font-family="monospace">import</text>
  <text x="163" y="62" font-size="9.5" fill="#E8E8F0" font-family="monospace">React</text>
  <text x="140" y="74" font-size="9.5" fill="#A07EF0" font-family="monospace">function</text>
  <text x="171" y="74" font-size="9.5" fill="#5B9EF7" font-family="monospace">App</text>
  <text x="140" y="86" font-size="9.5" fill="#686878" font-family="monospace">// API 호출</text>
  <text x="140" y="98" font-size="9.5" fill="#5B9EF7" font-family="monospace">fetch</text>
  <text x="160" y="98" font-size="9.5" fill="#4EC9A0" font-family="monospace">('/api')</text>
  <text x="140" y="110" font-size="9.5" fill="#A07EF0" font-family="monospace">return</text>
  <text x="163" y="110" font-size="9.5" fill="#F07070" font-family="monospace">&lt;div&gt;</text>
  <text x="148" y="122" font-size="9.5" fill="#F07070" font-family="monospace">&lt;h1&gt;</text>
  <text x="165" y="122" font-size="9.5" fill="#E8E8F0" font-family="monospace">{data}</text>
  <text x="148" y="134" font-size="9.5" fill="#F07070" font-family="monospace">&lt;/h1&gt;</text>
  <text x="140" y="146" font-size="9.5" fill="#F07070" font-family="monospace">&lt;/div&gt;</text>
  <text x="138" y="182" font-size="12" fill="#5B9EF7" font-family="monospace">JS 코드</text>
  <path d="M214 90 L234 90" stroke="#5B9EF7" stroke-width="1.5" stroke-dasharray="4 2"/>
  <path d="M230 85 L238 90 L230 95" stroke="#5B9EF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="240" y="20" width="92" height="140" rx="8" fill="#16161A" stroke="#4EC9A0" stroke-width="1.5"/>
  <rect x="240" y="20" width="92" height="26" rx="8" fill="#1E1E24"/>
  <rect x="240" y="38" width="92" height="8" fill="#1E1E24"/>
  <circle cx="252" cy="33" r="5.5" fill="#FF5F57"/>
  <circle cx="263" cy="33" r="5.5" fill="#FEBC2E"/>
  <circle cx="274" cy="33" r="5.5" fill="#28C840"/>
  <rect x="282" y="27" width="42" height="12" rx="3" fill="#252530" stroke="#686878" stroke-width=".5"/>
  <text x="303" y="42.5" font-size="9" fill="#A0A0AD" text-anchor="middle" font-family="monospace">localhost</text>
  <rect x="250" y="52" width="72" height="12" rx="3" fill="#5B9EF7" opacity=".8"/>
  <text x="286" y="61" font-size="9.5" fill="#0E0E10" text-anchor="middle" font-family="monospace" font-weight="bold">안녕하세요!</text>
  <rect x="250" y="68" width="50" height="5" rx="2" fill="#686878"/>
  <rect x="250" y="78" width="60" height="5" rx="2" fill="#686878"/>
  <rect x="250" y="88" width="44" height="5" rx="2" fill="#686878"/>
  <rect x="250" y="102" width="72" height="22" rx="5" fill="#1E1E24" stroke="#4EC9A0" stroke-width="1"/>
  <text x="286" y="116" font-size="9" fill="#4EC9A0" text-anchor="middle" font-family="monospace">데이터 카드</text>
  <rect x="250" y="130" width="30" height="12" rx="4" fill="#5B9EF7" opacity=".8"/>
  <rect x="286" y="130" width="30" height="12" rx="4" fill="#1E1E24" stroke="#686878" stroke-width=".8"/>
  <text x="246" y="184" font-size="12" fill="#4EC9A0" font-family="monospace">실제 화면</text>
  <text x="170" y="226" font-size="14" fill="#E8E8F0" text-anchor="middle" font-family="monospace" font-weight="bold">디자인 → 코드 → 화면</text>
  <text x="170" y="244" font-size="12" fill="#A0A0AD" text-anchor="middle" font-family="monospace">프론트엔드가 만드는 과정</text>
</svg>`

const ROLE_ITEMS = [
  { title: '화면 구현', desc: '디자인 시안을 실제 동작하는 웹 화면으로 만듭니다' },
  { title: 'API 연동', desc: '백엔드 서버에서 받은 데이터를 화면에 뿌려줍니다' },
  { title: '인터랙션', desc: '클릭, 입력, 애니메이션 등 사용자 경험을 코드로 구현합니다' },
  { title: '반응형', desc: 'PC·태블릿·모바일 어디서 봐도 잘 보이도록 대응합니다' },
  { title: '성능·접근성', desc: '빠르게 로딩되고, 누구나 쓸 수 있도록 최적화합니다' },
  { title: '디버깅', desc: '버그를 찾아내고, 왜 안 되는지 파악해서 고칩니다' },
]

const DIFF_ITEMS = [
  { h: 'HTML / CSS 중심', d: '마크업, 스타일링, 크로스브라우징' },
  { h: 'JavaScript / 프레임워크', d: 'React, Vue로 동적 기능 개발' },
  { h: '정적인 화면 제작', d: '디자인을 코드로 정밀하게 재현' },
  { h: '데이터가 살아있는 화면', d: '로그인, 필터링, 실시간 업데이트' },
  { h: '디자인 → 코드', d: '시각적 완성도에 집중' },
  { h: '데이터 + 로직 + 화면', d: 'API, 상태관리, 라우팅까지' },
  { h: '협업: 디자이너', d: '시안을 1:1로 구현' },
  { h: '협업: 백엔드 + 기획', d: '데이터 흐름과 기능 명세를 같이 봄' },
]

const FLOW_STEPS = [
  { role: '기획자', name: '요구사항 정의', desc: '기능 명세, 화면 흐름', icon: '📋', color: 'var(--am)', highlight: false },
  { role: '디자이너', name: '시안 제작', desc: 'Figma UI 설계', icon: '🎨', color: 'var(--pu)', highlight: false },
  { role: '퍼블리셔', name: '마크업', desc: 'HTML/CSS 구현', icon: '📄', color: 'var(--gn)', highlight: false },
  { role: '★ 프론트엔드', name: '기능 개발', desc: 'API연동·상태관리', icon: '⭐', color: 'var(--ac)', highlight: true },
  { role: '백엔드', name: 'API 제공', desc: 'DB·서버 운영', icon: '🖥', color: 'var(--co)', highlight: false },
  { role: '배포', name: '서비스 오픈', desc: '빌드·QA·배포', icon: '🚀', color: 'var(--ac)', highlight: false },
]

const STACK_ITEMS = [
  { cat: '기본기', badges: ['HTML', 'CSS', 'JavaScript', 'TypeScript'], cls: 'bgr' },
  { cat: '프레임워크', badges: ['React', 'Vue', 'Next.js'], cls: 'bb' },
  { cat: 'API / 데이터', badges: ['REST API', 'axios', 'React Query'], cls: 'bg2c' },
  { cat: '상태관리', badges: ['Zustand', 'Redux', 'Recoil'], cls: 'bp' },
  { cat: '빌드 / 배포', badges: ['Vite', 'Webpack', 'Vercel'], cls: 'ba' },
  { cat: '협업 도구', badges: ['Git', 'GitHub', 'Figma', 'Jira'], cls: 'bgr' },
]

const PERF_CARDS = [
  { metric: 'LCP', unit: 'Largest Contentful Paint', desc: '페이지에서 가장 큰 콘텐츠(히어로 이미지, 큰 텍스트)가 화면에 그려지는 시간. 사용자가 "로딩됐다"고 느끼는 순간이에요.', thr: [{ cls: 'g', t: '≤2.5s', d: '좋음' }, { cls: 'y', t: '≤4s', d: '개선 필요' }, { cls: 'r', t: '>4s', d: '나쁨' }], tip: '💡 이미지 압축 · preload · CDN 적용' },
  { metric: 'INP', unit: 'Interaction to Next Paint', desc: '버튼 클릭·텍스트 입력 같은 인터랙션에 화면이 반응하는 시간. 느리면 "이 사이트 반응이 없어"가 돼요.', thr: [{ cls: 'g', t: '≤200ms', d: '좋음' }, { cls: 'y', t: '≤500ms', d: '개선 필요' }, { cls: 'r', t: '>500ms', d: '나쁨' }], tip: '💡 무거운 JS 분리 · 이벤트 핸들러 최적화' },
  { metric: 'CLS', unit: 'Cumulative Layout Shift', desc: '로딩 중 이미지·광고가 뒤늦게 끼어들어 텍스트가 밀리는 현상의 누적값. 읽다가 버튼을 잘못 누르게 되는 그거예요.', thr: [{ cls: 'g', t: '≤0.1', d: '좋음' }, { cls: 'y', t: '≤0.25', d: '개선 필요' }, { cls: 'r', t: '>0.25', d: '나쁨' }], tip: '💡 이미지 width/height 명시 · 광고 공간 미리 확보' },
]

const DESIGN_GOOD = [
  { title: '컴포넌트 단위로 일관된 스타일', desc: '버튼, 카드가 전 페이지에서 동일하면 한 번 만들어두고 재사용 가능해요.', tag: '재사용 가능 · 속도 ↑' },
  { title: '8px 그리드 기반 여백', desc: '여백이 8, 16, 24px처럼 배수로 떨어지면 CSS로 옮기기 쉬워요.', tag: '구현 용이 · 일관성 ↑' },
  { title: '빈 상태·에러 화면 포함', desc: '데이터가 없을 때, 에러날 때 화면이 시안에 있으면 누락 없이 구현돼요.', tag: '예외처리 명확' },
  { title: '모바일 시안도 함께', desc: 'PC만 있으면 모바일을 개발자가 스스로 판단해야 해요.', tag: '반응형 정확도 ↑' },
]

const DESIGN_BAD = [
  { title: '페이지마다 다른 버튼 스타일', desc: '재사용이 안 되고 코드가 복잡해져요.', tag: '컴포넌트 불가 · 작업량 ↑' },
  { title: '픽셀 단위 절대 위치', desc: '"좌상단에서 137px" 같은 고정 위치는 화면 크기 바뀌면 무너져요.', tag: '반응형 불가' },
  { title: '텍스트 항상 1줄 고정', desc: '실제 데이터는 길이가 달라요. 긴 텍스트 대응이 없으면 레이아웃이 터져요.', tag: '예외 케이스 누락' },
  { title: '인터랙션 설명 없는 시안', desc: 'hover, 비활성화 상태가 없으면 개발자가 전부 추측해야 해요.', tag: '커뮤니케이션 비용 ↑' },
]

const COLLAB = [
  { role: '기획자', cls: 'rpm', tips: ['버튼 클릭 후 동작을 명세서에 써줘요', '예외 케이스(빈 값, 에러)도 정의해줘요', '기능 변경은 문서나 티켓으로 남겨줘요', '"될 것 같아요?" 보다 "언제까지 가능해요?"'] },
  { role: '디자이너', cls: 'rds', tips: ['색상·폰트를 Figma 변수로 정의해줘요', 'hover·focus·disabled 상태도 넣어줘요', '컴포넌트 단위로 프레임을 나눠줘요', '"느낌이 달라요"보다 "이 값이 달라요"'] },
  { role: '퍼블리셔', cls: 'rpb', tips: ['클래스 이름을 기능 기반으로 지어줘요', '인라인 스타일보다 클래스로 처리해줘요', 'JS 붙을 곳에 id나 data 속성 달아줘요', '반복 구조를 미리 얘기해줘요'] },
  { role: '백엔드', cls: 'rbe', tips: ['API 명세서(Swagger)를 미리 공유해줘요', '에러 응답에 이유를 담아줘요 (message)', 'API 변경사항은 사전에 알려줘요', '개발 서버와 목업 데이터를 같이 올려줘요'] },
]

const FAQ_DATA = [
  { q: '디자인대로 만들었는데 왜 다르게 보여요?', a: '브라우저마다 기본 스타일이 달라요. Figma는 픽셀 단위로 정확하지만 웹은 화면 크기가 제각각이라 폰트, 줄바꿈 위치가 달라져요. 이걸 맞추는 게 프론트 작업의 상당 부분이에요.' },
  { q: '이거 구현하는 데 왜 이렇게 오래 걸려요?', a: '화면이 단순해 보여도 안에서 처리하는 게 많아요. "검색 필터" 하나만 해도 — 입력값, API 요청, 로딩, 에러, 빈 결과, URL 동기화, 모바일 레이아웃까지. 눈에 보이는 건 10%예요.' },
  { q: '프론트엔드가 데이터베이스도 건드려요?', a: '일반적으로는 아니에요. DB는 백엔드 영역이고 프론트는 API를 통해서만 데이터를 받아요. Next.js 같은 풀스택 프레임워크를 쓰면 경계가 흐려지기도 해요.' },
  { q: '"새로고침하면 된다"는 말을 왜 자주 해요?', a: '브라우저가 이전에 받아둔 캐시를 그대로 써서 새 코드가 반영 안 되는 경우예요. 새로고침하면 최신 파일을 다시 받아와서 해결돼요.' },
  { q: '앱이랑 웹이랑 뭐가 달라요?', a: '웹은 브라우저에서, 앱은 설치해서 사용해요. 프론트엔드는 주로 웹을 만들어요. React Native, Flutter로 앱을 만들기도 하고, 하나의 코드로 둘 다 만드는 시도도 많아요.' },
]

type GlossItem = { key: string; title: string; body: string }
const GLOSS_SECTIONS: { emoji: string; label: string; items: GlossItem[] }[] = [
  {
    emoji: '🔌', label: 'API / 통신',
    items: [
      { key: 'API', title: '백엔드와 대화하는 창구', body: `프론트가 "이 유저 정보 줘"라고 요청하면 백엔드가 데이터를 돌려주는 약속된 통로예요.<div class="tcode">GET /api/users/123  →  { name: "김철수", age: 28 }</div>` },
      { key: 'REST API', title: '가장 흔한 API 방식', body: `URL로 대상을 표현하고, GET·POST·DELETE 동사로 행동을 표현해요.<div class="tcode">GET /posts      → 목록\nPOST /posts     → 생성\nDELETE /posts/5 → 삭제</div>` },
      { key: 'JSON', title: '데이터 교환 포맷', body: `프론트와 백엔드가 데이터를 주고받을 때 쓰는 포맷이에요.<div class="tcode">{ "name": "이영희", "role": "designer" }</div>` },
      { key: 'HTTP 상태코드', title: '요청 결과를 숫자로 표현', body: `서버가 응답할 때 결과를 숫자로 알려줘요.<div class="tcode">200 OK           → 성공\n404 Not Found    → 없는 주소\n401 Unauthorized → 로그인 필요\n500 Server Error → 서버 문제</div>` },
      { key: 'CORS', title: '도메인 간 요청 제한 정책', body: `다른 도메인에서 API를 마음대로 못 부르게 막는 브라우저 정책이에요. 백엔드에서 허용 설정을 해줘야 해결돼요.` },
      { key: 'async/await', title: '기다리는 코드 작성법', body: `API 호출처럼 시간이 걸리는 작업 앞에 붙여요. 결과가 올 때까지 기다렸다가 다음 줄을 실행해요.<div class="tcode">const data = await fetch('/api/users')\nconst json  = await data.json()</div>` },
      { key: 'JWT / SAML', title: '로그인 후 인증을 증명하는 두 가지 방식', body: `인증된 사용자임을 증명하는 방식인데, 어떤 환경이냐에 따라 쓰는 방법이 달라요.<br><br><strong style="color:var(--ac)">JWT</strong> — SPA·REST API 환경. 로그인하면 서버가 토큰을 발급하고, API 요청마다 헤더에 실어 보내요.<div class="tcode">Authorization: Bearer eyJhbGci...</div><strong style="color:var(--am)">SAML</strong> — 공공기관·기업 SSO 환경. XML 기반, IdP 서버가 인증 후 리다이렉트.<div class="tcode">JWT  : 프론트 → API 서버 (토큰을 헤더에 직접 포함)\nSAML : 브라우저 → IdP 서버 → 리다이렉트 → 서비스 서버</div>` },
      { key: 'WebSocket', title: '서버가 먼저 데이터를 밀어주는 실시간 통신', body: `일반 API는 프론트가 요청해야만 응답하지만, WebSocket은 서버가 먼저 데이터를 보낼 수 있어요. 채팅·실시간 알림·주가 변동처럼 즉각적인 업데이트가 필요할 때 써요.` },
      { key: 'Swagger', title: 'API 목록을 자동으로 문서화한 페이지', body: `백엔드가 어떤 API를 제공하는지 자동으로 정리해주는 도구예요. "스웨거 주소 보내줘"는 API 목록 문서를 공유해달라는 뜻이에요.` },
    ],
  },
  {
    emoji: '💻', label: '코드 / 개념',
    items: [
      { key: '컴포넌트', title: '재사용 가능한 UI 조각', body: `버튼, 카드 같은 UI 요소를 레고 조각처럼 만들어 이곳저곳에 갖다 쓸 수 있어요.` },
      { key: '상태 (State)', title: '화면이 기억하는 데이터', body: `"로그인 됐나요?" 같은 현재 상황을 기억하는 것. 상태가 바뀌면 화면이 자동으로 다시 그려져요.<div class="tcode">const [isLoggedIn, setIsLoggedIn] = useState(false)</div>` },
      { key: '렌더링', title: '화면을 그리는 것', body: `HTML·CSS·JS를 브라우저가 해석해서 눈에 보이는 화면으로 그려내는 과정이에요.` },
      { key: 'CSR / SSR', title: '화면을 어디서 그리냐', body: `CSR(Client Side Rendering)은 브라우저에서, SSR(Server Side Rendering)은 서버에서 HTML을 완성해서 내려줘요.<div class="tcode">CSR: 빈 HTML → JS 실행 → 화면 완성\nSSR: 서버에서 완성 HTML → 즉시 표시</div>` },
      { key: '빌드 (Build)', title: '배포 전 최적화 과정', body: `개발용 코드를 브라우저가 빠르게 읽도록 압축·변환하는 작업. 배포 전에 꼭 해요.<div class="tcode">npm run build → /dist 에 최적화 파일 생성</div>` },
      { key: '캐싱 (Cache)', title: '데이터 임시 저장', body: `한 번 받아온 파일을 저장해뒀다가 재사용하는 것. "캐시 지워봐"라는 말이 나오는 이유예요.` },
      { key: '라우팅', title: 'URL에 따라 화면 이동', body: `주소창의 URL이 바뀔 때 어떤 화면을 보여줄지 결정하는 것.<div class="tcode">/         → 홈 화면\n/login    → 로그인 화면\n/post/42  → 42번 글 상세</div>` },
      { key: '반응형', title: '화면 크기에 따라 자동으로 달라지는 레이아웃', body: `PC에서 볼 때와 모바일에서 볼 때 화면 구성이 달라지는 것.<div class="tcode">@media (max-width: 768px) {\n  .sidebar { display: none; }\n}</div>` },
      { key: 'DOM', title: '브라우저가 HTML을 표현하는 트리 구조', body: `Document Object Model. JS로 "이 버튼 텍스트 바꿔줘", "이 영역 숨겨줘" 하는 게 DOM을 조작하는 거예요.<div class="tcode">document.getElementById('btn').textContent = '완료'</div>` },
      { key: 'Virtual DOM', title: 'React가 화면을 빠르게 업데이트하는 방식', body: `React가 실제 DOM을 직접 바꾸기 전에 가상의 복사본에서 먼저 변경을 계산해요. 달라진 부분만 실제 DOM에 반영해서 불필요한 렌더링이 줄어들어요.` },
      { key: 'props', title: '부모 컴포넌트가 자식에게 넘기는 데이터', body: `컴포넌트 간에 데이터를 전달할 때 써요.<div class="tcode">&lt;Button color="blue" label="저장" /&gt;\n// → Button 컴포넌트 안에서 color, label을 props로 받아 씀</div>` },
      { key: 'Hook (훅)', title: 'React 함수형 컴포넌트의 상태·생명주기 API', body: `useState, useEffect처럼 use로 시작하는 React 내장 함수들이에요.<div class="tcode">const [count, setCount] = useState(0)\nuseEffect(() => { fetch('/api') }, [])</div>` },
      { key: 'TypeScript', title: 'JS에 타입 검사를 더한 언어', body: `변수나 함수에 타입을 미리 선언해요. 실수를 빌드 전에 잡아줘서 대형 프로젝트에서 많이 써요.<div class="tcode">// JS: 타입 없음\nfunction add(a, b) { return a + b }\n\n// TS: 타입 명시\nfunction add(a: number, b: number): number { return a + b }</div>` },
    ],
  },
  {
    emoji: '🌐', label: '크로스 브라우징 / 환경',
    items: [
      { key: '크로스 브라우징', title: '어느 브라우저에서나 같게 보이게', body: `크롬, 사파리, 파이어폭스, 엣지 등 브라우저마다 HTML·CSS를 해석하는 방식이 조금씩 달라요. "크롬에선 되는데 사파리에서 깨져요"가 바로 이 문제예요.` },
      { key: '개발자 도구 (F12)', title: '브라우저 안의 개발자 전용 패널', body: `F12를 누르면 열리는 패널이에요. 에러 확인, 네트워크 요청 확인, CSS 수정 등을 할 수 있어요.<div class="tcode">F12 → Console : 에러·로그 확인\nF12 → Network : API 요청 확인\nF12 → Elements: HTML/CSS 실시간 수정</div>` },
      { key: 'localhost', title: '내 컴퓨터에서만 열리는 개발용 주소', body: `개발할 때 실제 서버에 올리기 전에 내 컴퓨터에서 먼저 테스트해요.<div class="tcode">http://localhost:3000  ← 내 컴퓨터에서만 접속 가능\nhttps://myapp.com     ← 배포 후 누구나 접속 가능</div>` },
      { key: '배포 (Deploy)', title: '만든 걸 실제 인터넷에 올리는 것', body: `개발이 끝난 코드를 실제 사용자가 접속할 수 있는 서버에 올리는 과정이에요.` },
    ],
  },
  {
    emoji: '🛠', label: '개발 도구 / 협업',
    items: [
      { key: 'Git', title: '코드 변경 이력을 관리하는 도구', body: `코드를 언제, 누가, 무엇을 바꿨는지 기록해두는 도구예요.<div class="tcode">git commit  → 변경사항 저장\ngit push    → 원격 저장소에 올리기\ngit pull    → 팀원 코드 받아오기</div>` },
      { key: 'PR (Pull Request)', title: '코드 리뷰 요청', body: `"내가 만든 기능 코드를 메인 코드에 합쳐도 될까요? 먼저 검토해줘요"라는 요청이에요.` },
      { key: 'npm / yarn', title: '패키지 설치 도구', body: `다른 개발자가 만들어놓은 코드 묶음을 프로젝트에 설치하는 도구예요.<div class="tcode">npm install react   → React 설치\nnpm run dev         → 개발 서버 실행\nnpm run build       → 배포용 파일 만들기</div>` },
      { key: '환경변수', title: '코드 밖에서 관리하는 민감한 설정값', body: `API 키, 서버 주소처럼 코드에 직접 쓰면 안 되는 값들을 별도 파일(.env)에 저장해두는 방식이에요.<div class="tcode"># .env 파일 (비공개)\nVITE_API_URL=https://api.myapp.com</div>` },
      { key: 'CI/CD', title: '코드 push부터 배포까지 자동화하는 파이프라인', body: `코드를 push하면 자동으로 테스트 → 빌드 → 배포까지 이어지는 흐름이에요.<div class="tcode">git push → 자동 테스트 → 빌드 → 스테이징 배포 → 운영 배포</div>` },
      { key: 'Storybook', title: '컴포넌트를 독립적으로 확인하는 도구', body: `버튼, 카드 같은 UI 컴포넌트를 실제 서비스 화면 없이 따로 개발하고 문서화할 수 있어요. 디자이너와 빠른 확인·협업 도구로도 써요.` },
      { key: '모킹 (Mocking)', title: '가짜 API 응답으로 개발을 먼저 진행하는 것', body: `백엔드 API가 아직 안 만들어졌을 때 가짜 데이터로 프론트 개발을 먼저 진행하는 것이에요.<div class="tcode">GET /api/users → [{ id: 1, name: "테스트유저" }]  // mock 데이터</div>` },
    ],
  },
  {
    emoji: '💬', label: '회의·협업에서 자주 나오는 말',
    items: [
      { key: 'QA', title: '배포 전 품질 검사', body: `Quality Assurance의 줄임말. 개발이 끝난 기능을 배포하기 전에 버그는 없는지, 기획대로 잘 작동하는지 테스트하는 과정이에요.` },
      { key: '스프린트', title: '정해진 기간 단위로 일하는 방식', body: `보통 1~2주 단위로 목표를 정하고 그 안에 개발을 완료하는 방식이에요. "이번 스프린트에 넣자"는 이번 1~2주 안에 개발하자는 뜻이에요.` },
      { key: '핫픽스', title: '긴급 버그 수정 배포', body: `서비스에 심각한 버그가 생겼을 때 정기 배포를 기다리지 않고 급하게 수정해서 올리는 것. "핫픽스 나갑니다"는 긴급 상황이에요.` },
      { key: '레거시 (Legacy)', title: '오래되고 낡은 코드', body: `오래 전에 짠 코드라 지금 기준으로는 비효율적이지만 건드리기 무서운 코드예요.` },
      { key: '기술 부채', title: '나중에 갚아야 할 코드의 빚', body: `빠르게 개발하느라 제대로 짜지 않은 코드들이 쌓이는 것. 당장은 빠르지만 나중에 고치거나 기능을 추가할 때 더 오래 걸리게 돼요.` },
      { key: '리팩토링', title: '기능은 그대로, 코드만 다시 정리', body: `화면에 보이는 결과는 똑같지만 코드 내부를 더 깔끔하고 효율적으로 다시 짜는 것이에요.` },
    ],
  },
  {
    emoji: '📊', label: '성능 지표',
    items: [
      { key: 'Core Web Vitals', title: 'Google이 정한 3가지 핵심 성능 지표', body: `LCP·INP·CLS 세 가지로 사용자 체감 성능을 측정해요. Google 검색 순위에 직접 영향을 줘요.` },
      { key: 'LCP', title: '페이지에서 가장 큰 요소가 뜨는 시간', body: `Largest Contentful Paint. 히어로 이미지나 큰 텍스트 블록이 화면에 그려지는 시간이에요.<div class="tcode">≤ 2.5s     좋음 ✅\n2.5 – 4s   개선 필요 ⚠\n   > 4s    나쁨 ❌</div>` },
      { key: 'INP', title: '클릭·입력에 화면이 반응하는 시간', body: `Interaction to Next Paint. 버튼 클릭·텍스트 입력 후 다음 화면 업데이트까지 걸리는 시간이에요.<div class="tcode">≤ 200ms      좋음 ✅\n200 – 500ms  개선 필요 ⚠\n  > 500ms    나쁨 ❌</div>` },
      { key: 'CLS', title: '로딩 중 레이아웃이 갑자기 밀리는 정도', body: `Cumulative Layout Shift. 이미지·광고가 뒤늦게 로드되면서 텍스트가 밀리는 현상의 누적값이에요.<div class="tcode">≤ 0.1       좋음 ✅\n0.1 – 0.25  개선 필요 ⚠\n  > 0.25    나쁨 ❌</div>` },
      { key: 'Lighthouse', title: '크롬에 내장된 성능 측정 도구', body: `F12 → Lighthouse 탭에서 성능·접근성·SEO 등을 0~100점으로 채점해줘요.<div class="tcode">F12 → Lighthouse → Analyze page load\n→ Performance  : 87점\n→ Accessibility: 94점\n→ SEO          : 100점</div>` },
    ],
  },
]

export default function AboutFrontendPage() {
  const [openFaq, setOpenFaq] = useState(new Set<number>())
  const [openGloss, setOpenGloss] = useState(new Set<string>())
  const [demoName, setDemoName] = useState('')
  const [demoRole, setDemoRole] = useState('')
  const [demoEmail, setDemoEmail] = useState('')
  const [demoOutput, setDemoOutput] = useState('')

  const toggleFaq = (i: number) => setOpenFaq(prev => {
    const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n
  })

  const toggleGloss = (k: string) => setOpenGloss(prev => {
    const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n
  })

  const runDemo = () => {
    if (!demoName && !demoRole && !demoEmail) {
      setDemoOutput('<span style="color:var(--co)">⚠ 값을 하나 이상 입력해주세요</span>')
      return
    }
    const obj: Record<string, string> = {}
    if (demoName) obj.name = demoName
    if (demoRole) obj.role = demoRole
    if (demoEmail) obj.email = demoEmail
    obj.createdAt = new Date().toISOString()
    obj.status = 'pending'
    const raw = JSON.stringify(obj, null, 2)
    const colored = raw
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"([^"]+)":/g, '<span style="color:var(--co)">"$1"</span>:')
      .replace(/: "([^"]*)"/g, ': <span style="color:var(--gn)">"$1"</span>')
      .replace(/: (true|false|null)/g, ': <span style="color:var(--pu)">$1</span>')
    const ts = new Date().toLocaleTimeString()
    setDemoOutput(`<span style="color:var(--t3)">// POST /api/users · ${ts}</span>\n${colored}`)
  }

  return (
    <div className="fe-intro">
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      <nav>
        <span className="nav-logo"><span className="nav-dot" />FE.intro</span>
        <ul className="nav-links">
          <li><a href="#role">역할</a></li>
          <li><a href="#diff">vs 퍼블</a></li>
          <li><a href="#flow">협업 흐름</a></li>
          <li><a href="#stack">기술 스택</a></li>
          <li><a href="#perf">성능 지표</a></li>
          <li><a href="#design">디자인 시선</a></li>
          <li><a href="#collab">협업 팁</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#glossary">용어 사전</a></li>
          <li><a href="#qa">Q&amp;A</a></li>
          <li><Link href="/">← 메인</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="fe-hero">
        <div>
          <div className="hero-eye">// 직군 소개 · Frontend Developer</div>
          <h1 className="hero-title">브라우저에서<br />살아 숨쉬게<br />만드는 사람<br /><em>프론트엔드</em></h1>
          <p className="hero-desc">디자인을 코드로 옮기고, 서버의 데이터를 화면에 연결하고, 사용자가 클릭하고 스크롤하는 모든 경험을 만듭니다.</p>
          <div className="hero-tags">
            {['HTML/CSS', 'JavaScript', 'React', 'API 연동', '상태관리', '반응형'].map(t => (
              <span key={t} className="htag">{t}</span>
            ))}
          </div>
        </div>
        <div className="fe-illust" dangerouslySetInnerHTML={{ __html: HERO_SVG }} />
      </section>

      {/* 역할 */}
      <section className="fe-sec" id="role">
        <div className="ey">what we do</div>
        <h2 className="stitle">프론트엔드 개발자가 하는 일</h2>
        <p className="sdesc">사용자가 눈으로 보고 손으로 만지는 모든 것을 만드는 사람이에요.</p>
        <div className="role-grid">
          {ROLE_ITEMS.map(item => (
            <div key={item.title} className="role-card">
              <div className="role-title">{item.title}</div>
              <div className="role-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 퍼블 vs FE */}
      <section className="fe-sec" id="diff">
        <div className="ey">publisher vs frontend dev</div>
        <h2 className="stitle">퍼블리셔와 뭐가 달라요?</h2>
        <p className="sdesc">같은 HTML/CSS를 쓰지만, 역할의 무게중심이 달라요.</p>
        <div className="diff-wrap">
          <div className="diff-h">
            <div className="dh pub">퍼블리셔</div>
            <div className="dh fe">프론트엔드 개발자</div>
          </div>
          <div className="diff-b">
            {DIFF_ITEMS.map(item => (
              <div key={item.h} className="dc">
                <strong>{item.h}</strong>
                <span>{item.d}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ marginTop: '10px', fontSize: '14px', color: 'var(--t3)' }}>* 회사에 따라 두 역할이 합쳐지거나 더 세분화되기도 해요</p>
      </section>

      {/* 협업 흐름 */}
      <section className="fe-sec" id="flow">
        <div className="ey">team collaboration</div>
        <h2 className="stitle">실제 업무는 이렇게 흘러요</h2>
        <p className="sdesc">기획부터 배포까지, 프론트엔드는 모든 직군과 연결된 중간 다리예요.</p>
        <div className="flow-wrap">
          <div className="flow">
            {FLOW_STEPS.map((step, i) => (
              <>
                <div key={step.role} className={`fs${step.highlight ? ' fe-step' : ''}`}>
                  <div className="fiw" style={{ color: step.color, fontSize: '20px' }}>{step.icon}</div>
                  <div className="fc">
                    <div className="frole">{step.highlight ? '★ 프론트엔드' : step.role}</div>
                    <div className="fname">{step.name}</div>
                    <div className="fdesc">{step.desc}</div>
                  </div>
                </div>
                {i < FLOW_STEPS.length - 1 && <div className="farr">→</div>}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* 코드 체험 */}
      <section className="fe-sec" id="demo">
        <div className="ey">live demo</div>
        <h2 className="stitle">버튼 하나 누르면 무슨 일이 일어날까?</h2>
        <p className="sdesc">폼을 채우고 버튼을 눌러보세요. 프론트엔드가 백엔드에 보내는 데이터가 어떻게 생겼는지 실시간으로 볼 수 있어요.</p>
        <div className="demo-wrap">
          <div className="demo-input">
            <div className="demo-bar">🧑‍💻 회원가입 화면 (프론트엔드가 만든 UI)</div>
            <div className="demo-fields">
              <div className="demo-field">
                <label>이름</label>
                <input type="text" placeholder="홍길동" value={demoName} onChange={e => setDemoName(e.target.value)} />
              </div>
              <div className="demo-field">
                <label>직군</label>
                <select value={demoRole} onChange={e => setDemoRole(e.target.value)}>
                  <option value="">선택하세요</option>
                  <option>기획자</option>
                  <option>디자이너</option>
                  <option>퍼블리셔</option>
                  <option>프론트엔드 개발자</option>
                  <option>백엔드 개발자</option>
                </select>
              </div>
              <div className="demo-field">
                <label>이메일</label>
                <input type="email" placeholder="hello@company.com" value={demoEmail} onChange={e => setDemoEmail(e.target.value)} />
              </div>
              <button className="demo-btn" onClick={runDemo}>API 요청 보내기 →</button>
            </div>
          </div>
          <div className="demo-output">
            <div className="demo-bar">🖥 백엔드로 전송되는 데이터 (JSON)</div>
            <div className="demo-json">
              {demoOutput
                ? <span dangerouslySetInnerHTML={{ __html: demoOutput }} />
                : <span className="demo-empty">← 폼을 채우고 버튼을 눌러보세요</span>
              }
            </div>
          </div>
        </div>
        <p style={{ marginTop: '.75rem', fontSize: '14px', color: 'var(--t3)', fontFamily: 'var(--mono)' }}>
          // 실제로는 이 JSON이 HTTP POST 요청으로 서버에 전송되고, 서버는 DB에 저장해요
        </p>
      </section>

      {/* 기술 스택 */}
      <section className="fe-sec" id="stack">
        <div className="ey">tech stack</div>
        <h2 className="stitle">주요 기술 스택</h2>
        <p className="sdesc">하나씩 쌓아가는 거예요. 모든 걸 한 번에 알 필요는 없어요.</p>
        <div className="sgrid">
          {STACK_ITEMS.map(item => (
            <div key={item.cat} className="scard">
              <div className="scat">{item.cat}</div>
              <div className="sbadges">
                {item.badges.map(b => <span key={b} className={`badge ${item.cls}`}>{b}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 성능 지표 */}
      <section className="fe-sec" id="perf">
        <div className="ey">web performance</div>
        <h2 className="stitle">웹 성능 지표</h2>
        <p className="sdesc">Google이 정한 Core Web Vitals — 사용자가 "빠르다·느리다"를 체감하는 순간을 숫자로 측정해요.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '.875rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--gn)', letterSpacing: '.08em' }}>⭐ CORE WEB VITALS</span>
          <span style={{ fontSize: '13px', color: 'var(--t3)' }}>— Google 검색 순위에 직접 영향을 주는 3가지 지표</span>
        </div>
        <div className="perf-grid">
          {PERF_CARDS.map(card => (
            <div key={card.metric} className="perf-card core">
              <div className="perf-badge">CORE WEB VITAL</div>
              <div className="perf-metric">{card.metric}</div>
              <div className="perf-unit">{card.unit}</div>
              <div className="perf-desc">{card.desc}</div>
              <div className="perf-thr">
                {card.thr.map(t => (
                  <div key={t.cls} className={`pt ${t.cls}`}>{t.t}<br />{t.d}</div>
                ))}
              </div>
              <div className="perf-tip">{card.tip}</div>
            </div>
          ))}
        </div>
        <div className="perf-also">
          <div className="perf-mini">
            <div className="pm-name">FCP</div>
            <div className="pm-full">First Contentful Paint</div>
            <div className="pm-desc">아직 최대 요소는 아니어도 뭔가 처음 화면에 그려지는 순간. 사용자가 "뭔가 되고 있구나"를 느끼는 시점이에요. ≤1.8s 좋음.</div>
          </div>
          <div className="perf-mini">
            <div className="pm-name">TTFB</div>
            <div className="pm-full">Time to First Byte</div>
            <div className="pm-desc">브라우저가 서버에 요청을 보내고 첫 응답 바이트가 도착하는 시간. 이게 느리면 이후 모든 지표가 같이 나빠져요. ≤800ms 좋음.</div>
          </div>
        </div>
        <div className="fe-note">💡<span><strong>F12 → Lighthouse</strong> 탭에서 이 지표를 한 번에 측정할 수 있어요. 0~100점으로 점수를 매겨주고 어디를 고쳐야 하는지 구체적인 개선 방법도 알려줘요.</span></div>
      </section>

      {/* 디자인 시선 */}
      <section className="fe-sec" id="design">
        <div className="ey">developer&apos;s eye on design</div>
        <h2 className="stitle">프론트엔드가 시안을 볼 때</h2>
        <p className="sdesc">디자이너와 개발자는 같은 시안을 다른 눈으로 봐요.</p>
        <div style={{ marginBottom: '.75rem' }}>
          <div className="dglabel good">✅ 개발자가 좋아하는 시안</div>
          <div className="dgrid">
            {DESIGN_GOOD.map(d => (
              <div key={d.title} className="dcard good">
                <div className="dtop"><div className="dico g">✓</div><div className="dtit">{d.title}</div></div>
                <div className="ddesc">{d.desc}</div>
                <span className="dtag g">{d.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="dglabel bad">❌ 개발자가 힘든 시안</div>
          <div className="dgrid">
            {DESIGN_BAD.map(d => (
              <div key={d.title} className="dcard bad">
                <div className="dtop"><div className="dico b">✗</div><div className="dtit">{d.title}</div></div>
                <div className="ddesc">{d.desc}</div>
                <span className="dtag b">{d.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 협업 팁 */}
      <section className="fe-sec" id="collab">
        <div className="ey">collaboration tips</div>
        <h2 className="stitle">타 직군과 일할 때 꿀팁!</h2>
        <p className="sdesc">이렇게 해주시면 정말 일하기 좋아요.</p>
        <div className="cgrid">
          {COLLAB.map(c => (
            <div key={c.role} className="cc2">
              <div className="cch"><span className={`crole ${c.cls}`}>{c.role}</span></div>
              <ul className="ctips">
                {c.tips.map(tip => (
                  <li key={tip}><span className="tm">✓</span>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="fe-note">💡<span>프론트도 마찬가지예요. 이상한 거 있으면 슬랙 DM 주세요!</span></div>
      </section>

      {/* FAQ */}
      <section className="fe-sec" id="faq">
        <div className="ey">frequently asked</div>
        <h2 className="stitle">&quot;왜 그게 안 돼요?&quot; — 자주 받는 질문</h2>
        <p className="sdesc">다른 직군에서 프론트엔드한테 자주 물어보는 것들이에요.</p>
        <div className="faq-list">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="fi">
              <div className="fq" onClick={() => toggleFaq(i)}>
                <span className="fqm">Q.</span>
                <span className="fqt">{item.q}</span>
                <span className={`fch${openFaq.has(i) ? ' open' : ''}`}>▼</span>
              </div>
              <div className={`fa${openFaq.has(i) ? ' vis' : ''}`}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 용어 사전 */}
      <section className="fe-sec" id="glossary">
        <div className="ey">glossary</div>
        <h2 className="stitle">용어 사전</h2>
        <p className="sdesc">회의할 때 갑자기 튀어나오는 단어들. 클릭하면 펼쳐져요.</p>
        {GLOSS_SECTIONS.map(cat => (
          <div key={cat.label}>
            <div className="gcat">{cat.emoji}&nbsp; {cat.label}</div>
            <div className="glist">
              {cat.items.map(item => {
                const k = `${cat.label}-${item.key}`
                return (
                  <div key={k} className="ti">
                    <div className="th" onClick={() => toggleGloss(k)}>
                      <span className="tk">{item.key}</span>
                      <span className="ts2">{item.title}</span>
                      <span className={`tch${openGloss.has(k) ? ' open' : ''}`}>▼</span>
                    </div>
                    <div
                      className={`tb${openGloss.has(k) ? ' vis' : ''}`}
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Q&A */}
      <section className="fe-sec" id="qa">
        <div className="ey">Q &amp; A</div>
        <h2 className="stitle">질문 받겠습니다</h2>
        <p className="sdesc">궁금한 거 다 물어봐요. 모르면 모른다고 할게요.</p>
        <div className="qa-center">
          <div className="qa-av">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#5B9EF7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div className="qa-name">Frontend Developer</div>
          <div className="qa-status"><span className="qa-sdot" /> 질문 대기 중</div>
        </div>
      </section>

      <footer>// Frontend Developer Intro · 버디버디 스터디 발표자료</footer>
    </div>
  )
}
