class Aligner:
    """
        A class to align two sequences with the
        Hirschberg's algorithm an extension of NW algorithm
    """

    def __init__(self, seq1, seq2, match, mismatch, gap):
        self.first_seq = seq1.strip().upper()
        self.second_seq = seq2.strip().upper()
        cols = len(self.first_seq) + 1
        rows = len(self.second_seq) + 1
        self.match = 1 if match is None else match
        self.mismatch = -1 if mismatch is None else mismatch
        self.gap = -1 if gap is None else gap
        self.fscore = [[0] * cols for x in range(rows)]
        self.init_matrix()


    """
        This function compares two nucleotides and returns a match 
        score if match and a mismatch score if they dont.
        
        :param nta the nucleotide from sequence 1
        :param ntb the nucleotide from sequence 2
    """
    def score(self, nta, ntb):
        if nta == ntb:
            return self.match
        return self.mismatch


    """
        Initalizes the score matrix used in the NW algorithm
        Do it row by row

    """
    def init_matrix(self):
        # Initialize the score matrix
        d = self.mismatch
        first = self.first_seq
        second = self.second_seq
        for i in range(len(first) + 1):
            self.fscore[0][i] = d * i
        for k in range(len(second) + 1):
            self.fscore[k][0] = d * k

        for k in range(1, len(second) + 1):
            for i in range(1, len(first) + 1):
                # Top-Left
                match = self.fscore[k - 1][i - 1] + self.score(first[i - 1], second[k - 1])
                # Left
                delete = self.fscore[k][i - 1] + d
                # Top
                insert = self.fscore[k - 1][i] + d
                self.fscore[k][i] = max(match, delete, insert)

    """
        Traceback the matrix to find one of the possible best alignments!
    """
    def find_optimal_alignments(self):
        alignment_a = ""
        alignment_b = ""
        i = len(self.first_seq)
        k = len(self.second_seq)
        path =  {str(x): [] for x in range(0, k + 1)}
        score = 0
        matrix = self.fscore
        flag = 1
        while i > 0 and k > 0:

            if flag == 1:
                path[str(k)].append(i)
                flag -= 1
            # Top-Left
            if i > 0 and k > 0 and matrix[k][i] == matrix[k - 1][i - 1] + self.score(self.first_seq[i - 1], self.second_seq[k - 1]):
                alignment_a = self.first_seq[i - 1] + alignment_a
                alignment_b = self.second_seq[k - 1] + alignment_b
                match = self.score(self.first_seq[i - 1], self.second_seq[k - 1])
                score += match
                i -= 1
                k -= 1


            # Top
            elif i > 0 and matrix[k][i] == matrix[k - 1][i] + self.mismatch:
                alignment_a = "-" + alignment_a
                alignment_b = self.second_seq[k - 1] + alignment_b
                score = score - 1
                k -= 1

            # Left
            else:
                alignment_a = self.first_seq[i - 1] + alignment_a
                alignment_b = "-" + alignment_b
                score = score - 1
                i -= 1
            path[str(k)].append(i)


        while k > 0:
            alignment_a = "-" + alignment_a
            alignment_b = self.second_seq[k - 1] + alignment_b
            k -= 1
            path[str(k)].append(i)
        while i > 0:
            alignment_a = self.first_seq[i - 1] + alignment_a
            alignment_b = "-" + alignment_b
            i -= 1
            path[str(k)].append(i)


        return {"alignment_a": alignment_a, "alignment_b": alignment_b,
                "score": score, "matrix": self.fscore,
                "path": path, "seq1": self.first_seq, "seq2": self.second_seq}
