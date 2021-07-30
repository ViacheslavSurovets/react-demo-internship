import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import i18n from '../core/i18n'

import { NestedComponent } from '../components'

import { TestContext } from '../context'
import { testActions } from '../redux/test/actions'

import './index.scss'

const App = () => {
  const { t } = useTranslation('translation')
  const [nestedComponentState, setNestedComponentState] = useState({
    text: 'string data',
    modified: false
  })
  const { testContextData, setTestContextData } = useContext(TestContext)
  const dispatch = useDispatch()
  const { testData, users } = useSelector(state => state.test)

  console.log('users', users)

  const { text, modified } = nestedComponentState

  const handleContextUpdate = () => setTestContextData('updated context data')
  const handleReduxUpdate = () =>
    dispatch(testActions.updateTestData('updated redux data'))

  const handleLanguageChange = () => {
    const RU_LOCALE = 'ru'
    const EN_LOCALE = 'en'
    const currentLanguage = i18n.language
    const isRussianLocale = currentLanguage === RU_LOCALE
    console.log(i18n)
    i18n.changeLanguage(isRussianLocale ? EN_LOCALE : RU_LOCALE)
  }

  const handleClick = () =>
    setNestedComponentState(({ modified }) => ({
      text: 'new nested container string',
      modified: !modified
    }))

  return (
    <div className="app">
      <div className="state-data">
        <span className="state-data__text">{testContextData}</span>
        <span className="state-data__text">{testData}</span>
      </div>

      <div className="triggers">
        <button onClick={handleContextUpdate}>{t('updateContext')}</button>
        <button onClick={handleReduxUpdate}>{t('updateRedux')}</button>
        <button onClick={() => dispatch(testActions.getUsers())}>
          get users
        </button>
      </div>

      <button onClick={handleLanguageChange}>{t('changeLanguage')}</button>

      {users.length
        ? users.map((u, idx) => <span key={idx}>{u.email}</span>)
        : null}

      <NestedComponent
        updateNestedComponentState={handleClick}
        stringData={text}
        modified={modified}
      />
    </div>
  )
}

export default App
