# Fabrica-Galletas Dev1

El objetivo principal de esta actividad es desarrollar una aplicación Web que permita simular una fábrica de galletas.

En una fábrica automatizada de galletas se controla la producción de diferentes tipos de galletas, cada una de las cuales se prepara según una fórmula específica que indica los tipos de ingredientes a utilizar, la cantidad o peso de cada uno de ellos y los tiempos de amasado y
horneado requeridos. La fábrica consiste de un conjunto de depósitos de ingredientes diversos (harina, azúcar, avena, sal, etc.), cada uno de los cuales se conecta con una válvula a un canal que los lleva hasta una balanza que controla el peso que requiere la fórmula con respecto a ese ingrediente. Una vez que se determine en la balanza que el peso es correcto, otra válvula hace caer el ingrediente específico a un pequeño depósito de almacenamiento temporal. Cuando todos los ingredientes de la fórmula han sido incluidos en este depósito se inicia el proceso de amasado en la cual, tres válvulas hacen pasar poco a poco las cantidades de ingredientes, agua y otros líquidos necesarios para ir realizando la mezcla. Una vez que la masa esté concluida, una última válvula deja caer la mezcla a un molde que a su vez va dejando caer la
preparación moldeada a una correa transportadora que mueve el producto crudo a un horno para su cocción. Al terminar la cocción esta misma correa trasporta el producto terminado hacia su proceso de reposo y posterior almacenamiento. Para que el proceso se haga correctamente se deben realizar tres controles: sobre la fórmula, sobre el amasado de la mezcla y sobre el horneado. La siguiente figura presenta un diagrama esquemático de la fábrica de galletas.

La aplicación Web a desarrollar debe contener dos secciones: 

La administración de ingredientes y fórmulas.
La simulación.
La sección de administración de ingredientes y fórmulas permite gestionar el inventario de ingredientes disponibles y las fórmulas para la preparación de las galletas. En esta sección se deben satisfacer los siguientes requerimientos:

Agregar al almacen una cantidad específica de unidades de un ingrediente. Por ejemplo "Agregar 5 de harina". Es posible que el ingrediente nunca haya existido en el almacen por lo que esta operación permite, además, crear una entrada de este ingrediente en la BD correspondiente. Tome en cuenta que inicialmente el almacen está completamente vacío. 
Agregar una fórmula a la fábrica la cual se identifica con un nombre y se define como un conjunto de ingredientes y las unidades correspondientes (la mínima unidad posible es 1). Por ejemplo: "Galleta con chispas de chocolate = 1 mantequilla + 1 lechera + 1 huevo + 2 harina + 1 vainilla + 2 chispas de chocolate". No es necesario que los ingredientes existan o estén disponibles en el almacén para dar de alta una fórmula. Si ya existe en el catálogo una fórmula con el mismo nombre, con esta operación se debe actualizar la fórmula correspondiente. Dependiendo de la operación realizada se debe mostrar al usuario un mensaje correspondiente. Por ejemplo, "La fórmula de la galleta con chispas de chocolate se agregó al catálogo" o  "Se actualizó la fórmula para la galleta con chispas de chocolate".
Remover una fórmula existente en el catálogo indicando el nombre de la misma. Dependiendo de la operación realizada se debe mostrar al usuario un mensaje correspondiente. Por ejemplo, "La fórmula de la galleta con chispas de chocolate se eliminó del catálogo" o  "No existe en el catálogo una fórmula identificada como galleta con chispas de chocolate".   
En la sección de simulación se procede a emular la manera como un operador controla la fábrica. Lo primero es indicar cuántas porciones de una fórmula específica se deben preparar. Por ejemplo "3 Galleta con chispas de chocolate". Además de verificar que la fórmula existe en el catálogo, lo siguiente es verificar que en el almacén hay suficientes ingredientes para hacer la producción requerida. Por ejemplo,  3 x Galleta con chispas de chocolate corresponde a 3 x mantequilla, 3 x lechera, 3 x huevo, 6 x harina,  3 x vainilla y 6 x chispas de chocolate. Si la fabricación es posible, un botón dará inicio a cada uno de los tres controles requeridos: sobre la fórmula, sobre el amasado de la mezcla y sobre el horneado. No se puede iniciar un subproceso si no ha terminado el anterior. Por ejemplo, para poder activar el botón de amasado hay que primero esperar que termine la preparación de la fórmula. Para cada subproceso hay que ir mostrando los pasos correspondientes. Por ejemplo, para la fórmula puede ser algo como:

Inicio de fabricación de 3 x Galleta con chispas de chocolate.
Inicio de control de fórmula.
Abrir válvula mantequilla.
Esperar que peso es 3.
Cerrar válvula de mantequilla.
Abrir válvula de depósito.
Cerrar válvula de depósito.
... <se repite lo mismo para cada uno de los ingredientes de la fórmula>.
Fin de control de fórmula.
Si bien no es necesario realizar animaciones o interfaz gráfica para la interacción con el simulador, está claro que le da un importante valor agregado a esta aplicación