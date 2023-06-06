import { useState } from 'react'
import { levels, calculateImc, Level } from './helpers/imc'
import { GridItem } from './components/GridItem/GridItem'
import leftArrowImg from './assets/leftarrow.png'
import styles from './App.module.css'
import logoImg from './assets/powered.png'

export function App() {
  const [heightField, setHeightField] = useState<number>(0)
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null)

  function handleCalculateButton() {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField))
    } else {
      alert('Preencha os campos corretamente.')
    }
  }

  function handleBackButton() {
    setToShow(null)
    setHeightField(0)
    setWeightField(0)
  }
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={logoImg} alt="" width={150} />
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>
            IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela
            Organização MUndial de Saúde para calcular o peso ideal de cada
            pessoa.
          </p>
          <input
            type="number"
            placeholder="Digite sua altura. ex: 1.5(m)"
            value={heightField > 0 ? heightField : ''}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
            disabled={!!toShow}
          />

          <input
            type="number"
            placeholder="Digite seu peso. ex: 60(kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
            disabled={!!toShow}
          />

          <button onClick={handleCalculateButton} disabled={!!toShow}>
            Calcular
          </button>
        </div>
        <div className={styles.rightSide}>
          {!toShow && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          )}
          {toShow && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImg} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
