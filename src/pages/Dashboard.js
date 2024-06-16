import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import _ from "lodash";

export default function Dashboard() {
  const [countUser, setCountUser] = useState();
  const [program, setProgram] = useState();
  const [client, setClient] = useState();
  const [trainer, setTrainer] = useState();
  const [employer, setEmployer] = useState(); 

  
  useEffect(() => {
    API.get('program/api/program/getProgramCount/').then((response) => {
      console.log("user detail", response.data);
      setCountUser(response.data);
      localStorage.setItem("count", response.data);
      let str = response.data.group_count;
      let filtered_array = _.filter(
        str, function (o) {
          return o?.name === 'PROGRAM ADMIN';
        }
      );
      setProgram(filtered_array?.[0]?.user_count)
      console.log("filtered_array", filtered_array);
      let client = _.filter(
        str, function (o) {
          return o?.name === 'CLIENT';
        }
      );
      setClient(client?.[0]?.user_count);
      let trainer = _.filter(
        str, function (o) {
          return o?.name === 'TRAINER';
        }
      );
      setTrainer(trainer?.[0]?.user_count);
      let employer = _.filter(
        str, function (o) {
          return o?.name === 'EMPLOYER';
        }
      );
      setEmployer(employer?.[0]?.user_count);
    })
      .catch((err) => {
        console.log("err", err);
      });
  }, [])

  return (
    <div className='p-4'>
      <div className='row'>
        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex justify-content-between">
                  <div class="align-self-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                    </svg>
                  </div>
                  <div class="media-body text-right">
                    <h3>{program}</h3>
                    <span>Program Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex justify-content-between">
                  <div class="align-self-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>
                  </div>
                  <div class="media-body text-right">
                    <h3>{client}</h3>
                    <span>Client</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex justify-content-between">
                  <div class="align-self-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                  </div>
                  <div class="media-body text-right">
                    <h3>{trainer}</h3>
                    <span>Staff</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card">
            <div class="card-content">
              <div class="card-body">
                <div class="media d-flex justify-content-between">
                  <div class="align-self-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                      <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z" />
                      <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z" />
                    </svg>
                  </div>
                  <div class="media-body text-right">
                    <h3>{employer}</h3>
                    <span>Fellows</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
