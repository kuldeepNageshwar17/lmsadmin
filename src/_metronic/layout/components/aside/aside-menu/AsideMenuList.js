/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import { shallowEqual, useSelector } from 'react-redux'
import { toAbsoluteUrl, checkIsActive } from '../../../../_helpers'
// import { permissionsContext } from '../../permissionManager/permissionContext'
import { permissionsContext } from '../../../../../app/modules/permissionManager/permissionContext'

export function AsideMenuList ({ layoutProps }) {
  const location = useLocation()
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open `
      : ''
  }
  const  {auth}  = useSelector(
    ({ auth }) => ({
      auth: auth
    }),
    shallowEqual
  )
  const { isUserAuthenticate } = useContext(permissionsContext)

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive('/home', false)}`}
          aria-haspopup='true'
        >
          
          <div className='menu-link' onClick={() => window.location.href = "http://localhost:3001/searchpage"} >
              <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span> 
            <span className='menu-text' >Home</span>
          </div>
           
        </li>
        
        <hr></hr>
        {/* <hr></hr>
       
        <hr></hr>{console.log("auth" ,auth)} */}
        {auth.isInstituteUser && ( 
        <li
          className={`menu-item `}
          aria-haspopup='true'
        >
          <NavLink className='menu-link' to='#'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>Institute Controls</span>
          </NavLink>
        </li>
        )}
       {/* {auth.isInstituteUser && ( <hr></hr> )} */}
       
        {(    auth.isInstituteUser || isUserAuthenticate('M1', 1))  && ( 
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
        )}
         {(    auth.isInstituteUser || isUserAuthenticate('M2', 1))  && ( <li
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
         )}

        {(    auth.isInstituteUser || isUserAuthenticate('M3', 1)) && (
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

        {(    auth.isInstituteUser || isUserAuthenticate('M6', 1)) && (
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
         )} 
        {(    auth.isInstituteUser || isUserAuthenticate('M7', 1)) && ( <li
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
        )}
        {(    auth.isInstituteUser || isUserAuthenticate('M4', 1)) && (   <li
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
          )}


        
        {   auth.isInstituteUser &&  (<li
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
        </li>)}

        {    auth.isInstituteUser  && ( <li
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
        )}

        {auth.isInstituteUser && ( <hr></hr> )}
        {auth.isInstituteUser && ( <hr></hr> )}
        {auth.isInstituteUser && ( 
          <li
            className={`menu-item `}
            aria-haspopup='true'
          >
            <NavLink className='menu-link' to='#'>
              <span className='svg-icon menu-icon'>
                <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
              </span>
              <span className='menu-text'>Branch Controls</span>
            </NavLink>
          </li>
        )}
       {/* {auth.isInstituteUser && ( <hr></hr> )} */}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}

        {/* <li
          className={`menu-item ${getMenuItemActive('/setting', false)}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/setting/Batch'>
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
        </li> */}
        {(auth.isInstituteUser || isUserAuthenticate('M8', 1))  && ( <li
          className={`menu-item ${getMenuItemActive('/setting/Batch')}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/setting/Batch'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>Batch</span>
            <i className='menu-arrow' />
          </NavLink>

          <div className='menu-submenu '>
            <ul className='menu-subnav'>
              <li className='menu-item  menu-item-parent' aria-haspopup='true'>
                <span className='menu-link'>
                  <span className='menu-text'>Batch</span>
                </span>
              </li>
            </ul>
          </div>
        </li>
        )}

        {(auth.isInstituteUser || isUserAuthenticate('M9', 1))  && ( <li
          className={`menu-item ${getMenuItemActive('/Student', false)}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/Student'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>Student</span>
            <i className='menu-arrow' />
          </NavLink>

          <div className='menu-submenu '>
            <ul className='menu-subnav'>
              <li className='menu-item  menu-item-parent' aria-haspopup='true'>
                <span className='menu-link'>
                  <span className='menu-text'>Students</span>
                </span>
              </li>
            </ul>
          </div>
        </li>
        )}
        {/* {isUserAuthenticate('M3', 1) && ( */}
          {(    auth.isInstituteUser || isUserAuthenticate('M3', 1))  && (  <li
            className={`menu-item ${getMenuItemActive('/user', false)}`}
            aria-haspopup='true'
            data-menu-toggle='hover'
          >
            <NavLink className='menu-link' to='/user/BranchUser'>
              <span className='svg-icon menu-icon'>
                <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
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
          )}
        {/* ) */}
        {/* } */}
        {(    auth.isInstituteUser || isUserAuthenticate('M2', 1)) && (
          <li
            className={`menu-item ${getMenuItemActive('/setting/classList', false)}`}
            aria-haspopup='true'
            data-menu-toggle='hover'
          >
            <NavLink className='menu-link' to='/setting/classList'>
              <span className='svg-icon menu-icon'>
                <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
              </span>
              <span className='menu-text'>Classes</span>
              <i className='menu-arrow' />
            </NavLink>

            <div className='menu-submenu '>
              <ul className='menu-subnav'>
                <li
                  className='menu-item  menu-item-parent'
                  aria-haspopup='true'
                >
                  <span className='menu-link'>
                    <span className='menu-text'>Classes</span>
                  </span>
                </li>
              </ul>
            </div>
          </li>
         )}
         {(    auth.isInstituteUser || isUserAuthenticate('M10', 1) ) && (
          <li
            className={`menu-item ${getMenuItemActive('/fee', false)}`}
            aria-haspopup='true'
            data-menu-toggle='hover'
          >
            <NavLink className='menu-link' to='/fee'>
              <span className='svg-icon menu-icon'>
                <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
              </span>
              <span className='menu-text'>Fee Management</span>
              <i className='menu-arrow' />
            </NavLink>

            <div className='menu-submenu '>
              <ul className='menu-subnav'>
                <li
                  className='menu-item  menu-item-parent'
                  aria-haspopup='true'
                >
                  <span className='menu-link'>
                    <span className='menu-text'>Fee Management</span>
                  </span>
                </li>
              </ul>
            </div>
          </li>
         )} 

         {/* {auth && auth.user && auth.user.roles &&  auth.user.roles.includes("222Brach_admin" ) && (  */}
         <li
            className={`menu-item ${getMenuItemActive('/setting/location', false)}`}
            aria-haspopup='true'
            data-menu-toggle='hover'
          >
            <NavLink className='menu-link' to='/setting/location'>
              <span className='svg-icon menu-icon'>
                <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
              </span>
              <span className='menu-text'>Location</span>
              <i className='menu-arrow' />
            </NavLink>

            <div className='menu-submenu '>
              <ul className='menu-subnav'>
                <li
                  className='menu-item  menu-item-parent'
                  aria-haspopup='true'
                >
                  <span className='menu-link'>
                    <span className='menu-text'>Location</span>
                  </span>
                </li>
              </ul>
            </div>
          </li>
          {/* )} */}
       
          {    auth.isInstituteUser  && (
          <li className={`menu-item ${getMenuItemActive('', false)}`}
            aria-haspopup='true'
            data-menu-toggle='hover'
          >
            <NavLink className='menu-link' to=''>
              {/* <span className='svg-icon menu-icon'>
                <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
              </span>
              <span className='menu-text'></span> */}
              {/* <i className='menu-arrow' /> */}
            </NavLink>
          </li>
        )}
        
        
        
        {(auth && auth.user && !auth.user.branch) && ( <li
          className={`menu-item ${getMenuItemActive('/setting/UserCourses')}`}
          aria-haspopup='true'
          data-menu-toggle='hover'
        >
          <NavLink className='menu-link' to='/setting/UserCourses'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Home/Library.svg')} />
            </span>
            <span className='menu-text'>MyCourses</span>
            <i className='menu-arrow' />
          </NavLink>

          <div className='menu-submenu '>
            <ul className='menu-subnav'>
              <li className='menu-item  menu-item-parent' aria-haspopup='true'>
                <span className='menu-link'>
                  <span className='menu-text'>MyCourses</span>
                </span>
              </li>
            </ul>
          </div>
        </li>
        )}
         
      </ul>
    </>
  )
}
