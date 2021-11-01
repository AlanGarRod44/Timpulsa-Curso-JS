import kaboom from "kaboom";
import { newGrid } from './gridSystem';
import { Origin } from 'kaboom';
import { newSnake, SnakeTags } from './Snake';
import { newRandomFood, FoodTags } from './randomFood';
kaboom();


declare function origin(o: Origin): any

scene("game", () => {
    const grid = newGrid(vec2(40, 18))

    add([
        rect(width(), height()),
        color(rgb(0, 0, 0))
    ])

    const { height: bHeight, width: bWidth } = grid.blockDimensions

    const snake = newSnake(grid, vec2(5, 5))

    let food = newRandomFood(grid, snake)

    // Updates the game state
    loop(.2, () => {
        snake.move(snake.direction)

        // Check if snake is eating food

        if (snake.body[0][0].isTouching(food)) {
            snake.grow()
            food.destroy()
            food = newRandomFood(grid, snake)
        }



    }
    )



    keyDown("left", () => {
        snake.direction = "left"
    })
    keyDown("right", () => {
        snake.direction = "right"
    })
    keyDown("down", () => {
        snake.direction = "down"
    })
    keyDown("up", () => {
        snake.direction = "up"
    })


})


scene("end", () => {
    add([
        text("Muerto"),
        pos(width() / 2, height() / 2)
    ])
})

go("game")