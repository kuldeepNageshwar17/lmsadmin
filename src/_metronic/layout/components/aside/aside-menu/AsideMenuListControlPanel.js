/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl, checkIsActive } from '../../../../_helpers'
import { permissionsContext } from '../../../../../app/modules/permissionManager/permissionContext'

export function AsideMenuListControlPanel ({ layoutProps }) {
  const location = useLocation()
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open `
      : ''
  }
  const { isUserAuthenticate } = useContext(permissionsContext)

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive('/dashboard', false)}`}
          aria-haspopup='true'
        >
          <NavLink className='menu-link' to='/dashboard'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {/*end::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive('/setting', false)}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/setting/Branch'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>setting</span>
            <i className='menu-arrow' />
          </NavLink>
          <div className='menu-submenu '>
            <ul className='menu-subnav'>
              <li className='menu-item  menu-item-parent' aria-haspopup='true'>
                <span className='menu-link'>
                  <span className='menu-text'>Branch</span>
                </span>
              </li>
              <li
                className={`menu-item ${getMenuItemActive('/setting/branch')}`}
                aria-haspopup='true'
              >
                <NavLink className='menu-link' to='/setting/branch'>
                  <i className='menu-bullet menu-bullet-dot'>
                    <span />
                  </i>
                  <span className='menu-text'>Branch</span>
                </NavLink>
              </li>
              <li
                className={`menu-item ${getMenuItemActive('/setting/class')}`}
                aria-haspopup='true'
              >
                <NavLink className='menu-link' to='/setting/class'>
                  <i className='menu-bullet menu-bullet-dot'>
                    <span />
                  </i>
                  <span className='menu-text'>Class</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li> */}

        <li
          className={`menu-item ${getMenuItemActive('/setting/Branch', false)}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/setting/Branch'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>Branch</span>
            {/* <i className='menu-arrow' /> */}
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/setting/class', false)}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/setting/class'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>Class</span>
            {/* <i className='menu-arrow' /> */}
          </NavLink>
        </li>
        {isUserAuthenticate("M3",1) && (
          <li className={`menu-item ${getMenuItemActive('/User', false)}`}
            aria-haspopup='true'
            data-menu-toggle='hover'
          >
            <NavLink className='menu-link' to='/User'>
              <span className='svg-icon menu-icon'>
                <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
              </span>
              <span className='menu-text'>Users</span>
              {/* <i className='menu-arrow' /> */}
            </NavLink>
          </li>
        )}
        {/* Components */}

        <li
          className={`menu-item ${getMenuItemActive(
            '/ecourse/Courses',
            false
          )}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/ecourse/Courses'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>Courses</span>
            {/* <i className='menu-arrow' /> */}
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/Test/testlist', false)}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/Test/testlist'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>Tests</span>
            {/* <i className='menu-arrow' /> */}
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/Exams', false)}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/Exams'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>Examination</span>
            <i className='menu-arrow' />
          </NavLink>

          <div className='menu-submenu '>
            <ul className='menu-subnav'>
              <li className='menu-item  menu-item-parent' aria-haspopup='true'>
                <span className='menu-link'>
                  <span className='menu-text'>Schedule Exam</span>
                </span>
              </li>
              <li
                className={`menu-item ${getMenuItemActive('/Exams/Scheduled')}`}
                aria-haspopup='true'
              >
                <NavLink className='menu-link' to='/Exams/Scheduled'>
                  <i className='menu-bullet menu-bullet-dot'>
                    <span />
                  </i>
                  <span className='menu-text'>Schedule Exam</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>


        
        <li
          className={`menu-item ${getMenuItemActive('/Notifications', false)}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/Notifications'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>Notifications</span>
          </NavLink>
        </li>

        <li
          className={`menu-item ${getMenuItemActive(
            '/permission/Roles',
            false
          )}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/permission/Roles'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>Permission</span>
            {/* <i className='menu-arrow' /> */}
          </NavLink>

          <div className='menu-submenu '>
            <ul className='menu-subnav'>
              <li className='menu-item  menu-item-parent' aria-haspopup='true'>
                <span className='menu-link'>
                  <span className='menu-text'>Permission</span>
                </span>
              </li>
            </ul>
          </div>
        </li>

        {/* begin::section */}
        <li className='menu-section '>
          <h4 className='menu-text'>Components</h4>
          <i className='menu-icon flaticon-more-v2'></i>
        </li>
      </ul>
    </>
  )
}
