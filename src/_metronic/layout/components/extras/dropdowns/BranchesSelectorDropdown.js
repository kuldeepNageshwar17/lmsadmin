/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import clsx from 'clsx'
import { Dropdown } from 'react-bootstrap'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import { DropdownTopbarItemToggler } from '../../../../_partials/dropdowns'

import { connect } from 'react-redux'
// import {actions} from "../../../../../app/modules/Auth/_redux/authRedux "
import { actions } from '../../../../../app/modules/Auth/_redux/authRedux'

function BranchSelectorDropdown ({ branches, currentBranch, changeBranch }) {
  return (
    <>
      {branches ? (
        <Dropdown drop='down' >
          <Dropdown.Toggle
            as={DropdownTopbarItemToggler}
            id='dropdown-toggle-my-Branches'
          >
            <OverlayTrigger
              placement='bottom'
              overlay={
                <Tooltip id='language-panel-tooltip'>Select Branch</Tooltip>
              }
            >
                            <div className='btn btn-dropdown  btn-lg mr-2'>

              {/* <div className='btn btn-icon btn-clean btn-dropdown btn-lg mr-1'> */}
                {currentBranch ? currentBranch.name : ''}
                {/* <img
              className="h-25px w-25px rounded"
              src={currentLanguage.flag}
              alt={currentLanguage.name}
            /> */}
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>
          <Dropdown.Menu className='p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround'>
            <ul className='navi navi-hover py-4'>
              {branches.filter(m=>m._id !== currentBranch._id).map(branch => (
                <li
                  key={branch._id}
                  className={clsx('navi-item', {
                    active: branch._id === currentBranch._id
                  })}
                >
                  <a
                    href='javscript:void()'
                    onClick={() =>{alert("chamngeld");changeBranch(branch._id)}}
                    className='navi-link'
                  >
                    {/* <span className="symbol symbol-20 mr-3">
                  <img src={language.flag} alt={language.name} />
                </span> */}
                    <span className='navi-text'>{branch.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        ''
      )}
    </>
  )
}

function mapStateToProps (state) {
  console.log(state);
  const { currentBranch, branches } = state.auth;
  return { currentBranch, branches }
}

export default connect(mapStateToProps, actions)(BranchSelectorDropdown)
