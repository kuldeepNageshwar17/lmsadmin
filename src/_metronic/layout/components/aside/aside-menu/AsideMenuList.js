/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl, checkIsActive } from '../../../../_helpers'

export function AsideMenuList ({ layoutProps }) {
  const location = useLocation()
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open `
      : ''
  }

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
      
        <li
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
              <ul className='menu-subnav'>
                <li
                  className={`menu-item ${getMenuItemActive('/setting/Batch')}`}
                  aria-haspopup='true'
                >
                  <NavLink className='menu-link' to='/setting/Batch'>
                    <i className='menu-bullet menu-bullet-dot'>
                      <span />
                    </i>
                    <span className='menu-text'>Batch</span>
                  </NavLink>
                </li>

             </ul>

            </ul>
          </div>
        </li>
     
     
        <li className={`menu-item ${getMenuItemActive(
                    '/Student',
                    false
                  )}`}
                  aria-haspopup='true'
                  data-menu-toggle='hover'
                >
                  <NavLink className='menu-link' to='/Student'>
                    <span className='svg-icon menu-icon'>
                      <SVG
                        src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')}
                      />
                    </span>
                    <span className='menu-text'>Student</span>
                    <i className='menu-arrow' />
                  </NavLink>

                  <div className='menu-submenu '>
                    <ul className='menu-subnav'>
                      <li
                        className='menu-item  menu-item-parent'
                        aria-haspopup='true'
                      >
                        <span className='menu-link'>
                          <span className='menu-text'>Students</span>
                        </span>
                      </li>
                     
                    </ul>
                  </div>
                </li>
             


                <li className={`menu-item ${getMenuItemActive(
                    '/user',
                    false
                  )}`}
                  aria-haspopup='true'
                  data-menu-toggle='hover'
                >
                  <NavLink className='menu-link' to='/user/BranchUser'>
                    <span className='svg-icon menu-icon'>
                      <SVG
                        src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')}
                      />
                    </span>
                    <span className='menu-text'>User</span>
                    <i className='menu-arrow' />
                  </NavLink>

                  <div className='menu-submenu '>
                    <ul className='menu-subnav'>
                      <li
                        className='menu-item  menu-item-parent'
                        aria-haspopup='true'
                      >
                        <span className='menu-link'>
                          <span className='menu-text'>User</span>
                        </span>
                      </li>
                      
                    </ul>
                  </div>
                </li>
             
    
      </ul>
    </>
  )
}
