# CS50M_bpress_patient_movile

# Resources.

- Follow the video: https://www.youtube.com/watch?v=BQ-kHwLlhrg

# Cosas a tener en cuenta.

- He intentado integrar añadir una nueva medición con un asyncThunk en measurementsSlice con su propio estado pero no funcionaba porque una vez ya añadida la primera medida con estado "succeeded" ya no podía volver a ponerlo en "idle" para añadir más. Utilicé un reducer para resetear el estado y disparar la acción tanto en el envento onClick de Link de measurements screen como en el useEffect del add screen y daba error al actualizar el estado mientras se montaban componentes.
  La solución ha sido implementar la lógica asíncrona directamente en add screen usando useEffet y un callback para manegar la adición usando un addStatus y addError para gestionar el ciclo "pending-> succeeded | failed", eliminando el asyncThunk y añadiendo un reducer para añadir una nueva medición al estado.

# TODO.

- Sustituir Expo DateTimePicker por 'react native paper dates' que es compatible con todas las plataformas. Ver documentación en [https://www.reactnativepaperdates.com/]
- El formulario de login funciona en el móvil pero no en la versión web... Los textimput pierden el foco continuamente y puede ser porque se monta y desmonta el componente, una posible solución está en este hilo [https://stackoverflow.com/questions/60467604/input-fields-lose-focus-on-each-value-change-in-a-complex-formik-form]
- Hacer que todos los iconos sean de la librearía FontAwesome6.
- Hacer que MyTextInput un componente a reutilizar en vez de definirlo allí donde se usa (add, login, sigingup ...)
