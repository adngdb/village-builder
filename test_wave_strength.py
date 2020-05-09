"""
This is a test file for the wave strength algorithm.
"""

import math


def wave(x, y):
    return int(x + y * x * x / 100 + math.cos(x) * x / 100)


print("turn | count | strength")
for turn in range(5, 100, 5):
    # print("{:>4} | {:>5} | {}".format(turn, count, wave(turn, count)))
    print(
        "{:>4} | {:>5} | {:>6} | {:>5} | {:>6} | {:>5} | {:>6}".format(
            turn, 1, wave(turn, 1), 2, wave(turn, 2), 3, wave(turn, 3),
        )
    )
